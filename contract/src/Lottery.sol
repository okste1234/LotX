// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {VRFV2WrapperConsumerBase} from "@chainlink/contracts/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract Lottery is VRFV2WrapperConsumerBase, ConfirmedOwner {

    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(
        uint256 requestId,
        uint256[] randomWords,
        uint256 payment
    );

    struct RequestStatus {
        uint256 paid; // amount paid in link
        bool fulfilled; // whether the request has been successfully fulfilled
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus) public s_requests; 

    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;
    uint256 public lastRequestTime;

    
    uint32 callbackGasLimit = 300000;

   
    uint16 requestConfirmations = 3;

    
    uint32 numWords;

    // Address LINK - hardcoded for Sepolia
    address linkAddress = 0x779877A7B0D9E8603169DdbD7836e478b4624789;

    // address WRAPPER - hardcoded for Sepolia
    address wrapperAddress = 0xab18414CD93297B0d12ac29E63Ca20f515b3DB46;

    uint public lotteryCounter = 0;
    uint public constant entryFee = 0.000015 ether;
    uint public lastEndTime;

    struct LotteryInfo {
        uint id;
        address manager;
        address[] players;
        uint endTime;
        uint balance;
        bool isActive;
    }

    struct WinnerInfo{
        address winner;
        uint256 amount;
    }

    mapping (uint256 => bool) drawnMade;
    mapping(uint => LotteryInfo) lotteries;
    mapping(uint=> WinnerInfo[]) winnersss;

    constructor() VRFV2WrapperConsumerBase(linkAddress, wrapperAddress) ConfirmedOwner(msg.sender) {}

    modifier restricted(uint lotteryId) {
        LotteryInfo storage lottery = lotteries[lotteryId];
        require(msg.sender == lottery.manager, "Only the manager can call this function");
        _;
    }

    
    function createLottery(uint durationInMinutes) public {
        lotteryCounter++;
        LotteryInfo storage newLottery = lotteries[lotteryCounter];
        require(block.timestamp >= lastEndTime, "A GAME IS CURRENTLY ON, join active draw instead");
        require(durationInMinutes > 0, "Invalid future time");
        newLottery.id = lotteryCounter;
        newLottery.manager = msg.sender;
        newLottery.endTime = block.timestamp + (durationInMinutes * 1 minutes);
        newLottery.isActive = true;
        lastEndTime = newLottery.endTime;
    }

  
    function enterLottery(uint lotteryId) public payable {
        require(lotteries[lotteryId].isActive, "Lottery is not active");
        require(block.timestamp < lotteries[lotteryId].endTime, "Lottery has ended");
        require(msg.value == entryFee, "Incorrect entry fee");

        lotteries[lotteryId].players.push(msg.sender);
        lotteries[lotteryId].balance += msg.value;
    }


    function pickWinners(uint lotteryId) public restricted(lotteryId) {
        require(drawnMade[lotteryId], "draw has not been made");
        require(lotteries[lotteryId].isActive, "Lottery is not active");
        require(block.timestamp >= lotteries[lotteryId].endTime, "Lottery duration has not ended");

        require(lastRequestId != 0, "requestRandomWords not called yet");
        require(block.timestamp > lastRequestTime, "Wait a bit longer for fulfillment");
        ( , bool fulfilled, ) = getRequestStatus(lastRequestId);
        require(fulfilled, "Request not yet fulfilled");

        uint numWinners = getNumWords(lotteryId);
        LotteryInfo storage lottery = lotteries[lotteryId];
        uint256 totalSlots = lottery.players.length;

        for (uint i = 0; i < numWinners; i++) {
            uint256 winnerIndex = s_requests[lastRequestId].randomWords[i] % totalSlots;
            require(winnerIndex <= totalSlots, "no out of bound");
            winnersss[lotteryId].push(WinnerInfo({winner: lottery.players[winnerIndex], amount: 0}));
        }

        distributePrizes(lotteryId);
        lotteries[lotteryId].isActive = false;
    }


   function distributePrizes(uint lotteryId) private {
        uint totalPrize = lotteries[lotteryId].balance;
        uint numWinners = winnersss[lotteryId].length;
        uint baseValue = 0;
        for (uint i = 1; i <= numWinners; i++) {
            baseValue += i;
        }
        uint baseShare = totalPrize/ baseValue;

        for (uint i = 0; i < numWinners; i++) {
            uint prize = baseShare * (numWinners - i);
            winnersss[lotteryId][i].amount = prize;
            payable(winnersss[lotteryId][i].winner).transfer(prize);
            
        }
    }

    function getWinners(uint lotteryId) public view returns(WinnerInfo[] memory){
        WinnerInfo[] storage winners = winnersss[lotteryId];

        return winners; 
    }
    function getLotteryInfo(uint lotteryId) public view returns (uint, address, address[] memory,  uint, uint, bool) {
        LotteryInfo storage lottery = lotteries[lotteryId];
        return (lottery.id, lottery.manager, lottery.players, lottery.endTime, lottery.balance, lottery.isActive);
    }

    function makeDraw(uint lotteryId)
        external
        restricted(lotteryId)
        returns (uint256 requestId)
    {
        require(lotteries[lotteryId].isActive, "Lottery is not active");
        require(block.timestamp >= lotteries[lotteryId].endTime, "Lottery duration has not ended");
        require(!drawnMade[lotteryId], "drawn made already");
        numWords = getNumWords(lotteryId);
        requestId = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            paid: VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
            randomWords: new uint256[](0),
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        lastRequestTime = block.timestamp;
        emit RequestSent(requestId, numWords);

        drawnMade[lotteryId] = true;
        return requestId;
    }

    function getNumWords(uint lotteryId) public view returns(uint32 _numWords) {
        uint numPlayers = lotteries[lotteryId].players.length;
        
        require(numPlayers <= type(uint32).max, "Number of winners exceeds uint32 max value");
        _numWords = uint32(((numPlayers * 40) / 100) + 1);
    }

   

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].paid > 0, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        emit RequestFulfilled(
            _requestId,
            _randomWords,
            s_requests[_requestId].paid
        );
    }

    function getRequestStatus(
        uint256 _requestId
    )
        public
        view
        returns (uint256 paid, bool fulfilled, uint256[] memory randomWords)
    {
        require(s_requests[_requestId].paid > 0, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.paid, request.fulfilled, request.randomWords);
    }


    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(linkAddress);
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    function OwnerWithdraw() public onlyOwner {
        address payable owner = payable(msg.sender);
        uint contractBalance = address(this).balance;


        owner.transfer(contractBalance);
    }

    receive() external payable { }

}