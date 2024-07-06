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
    mapping(uint256 => RequestStatus)
        public s_requests; /* requestId --> requestStatus */

    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;
    uint256 lastRequestTime;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 300000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFV2Wrapper.getConfig().maxNumWords.
    uint32 numWords;

    // Address LINK - hardcoded for Sepolia
    address linkAddress = 0x779877A7B0D9E8603169DdbD7836e478b4624789;

    // address WRAPPER - hardcoded for Sepolia
    address wrapperAddress = 0xab18414CD93297B0d12ac29E63Ca20f515b3DB46;

    address public manager;
    uint public lotteryCounter = 0;
    uint public constant entryFee = 0.000015 ether;

    struct LotteryInfo {
        uint id;
        address manager;
        address[] players;
        address[] winners;
        uint endTime;
        uint balance;
        bool isActive;
    }

    mapping(uint => LotteryInfo) public lotteries;

    constructor() VRFV2WrapperConsumerBase(linkAddress, wrapperAddress) ConfirmedOwner(msg.sender) {}

    function requestRandomWords(uint lotteryId)
        external
        onlyOwner
        returns (uint256 requestId)
    {
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
        return requestId;
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

    function createLottery(uint durationInMinutes) public {
        lotteryCounter++;
        LotteryInfo storage newLottery = lotteries[lotteryCounter];
        newLottery.id = lotteryCounter;
        newLottery.manager = msg.sender;
        newLottery.endTime = block.timestamp + (durationInMinutes * 1 minutes);
        newLottery.isActive = true;
    }

    function enter(uint lotteryId) public payable {
        require(lotteries[lotteryId].isActive, "Lottery is not active");
        require(block.timestamp < lotteries[lotteryId].endTime, "Lottery has ended");
        require(msg.value == entryFee, "Incorrect entry fee");

        lotteries[lotteryId].players.push(msg.sender);
        lotteries[lotteryId].balance += msg.value;
    }

    function pickWinners(uint lotteryId) public restricted(lotteryId) {
        require(lotteries[lotteryId].isActive, "Lottery is not active");
        require(block.timestamp >= lotteries[lotteryId].endTime, "Lottery duration has not ended");

        require(lastRequestId != 0, "requestRandomWords not called yet");
        require(block.timestamp > lastRequestTime + 40, "Wait a bit longer for fulfillment");
        ( , bool fulfilled, ) = getRequestStatus(lastRequestId);
        require(fulfilled, "Request not yet fulfilled");

        uint numWinners = getNumWords(lotteryId);
        LotteryInfo storage lottery = lotteries[lotteryId];
        uint256 totalSlots = lottery.players.length;
        address[] memory selectedWinners = new address[](numWords);
        uint256[] memory latestRandomWords = s_requests[lastRequestId].randomWords;
        require(latestRandomWords.length == numWords, "Random words not available");
        
        for (uint i = 0; i < numWinners; i++) {
            uint256 winnerIndex = latestRandomWords[i] % totalSlots;
            // Ensure winnerIndex is within the bounds of the players array
            require(winnerIndex < lotteries[lotteryId].players.length, "Index out of bounds");
            selectedWinners[i] = lotteries[lotteryId].players[winnerIndex];
        }
        lottery.winners = selectedWinners; // Store winners for distribution

        distributePrizes(lotteryId);
        lotteries[lotteryId].isActive = false; // Mark the lottery as inactive
    }

    function distributePrizes(uint lotteryId) private {
        uint totalPrize = lotteries[lotteryId].balance;
        uint numWinners = lotteries[lotteryId].winners.length;

        for (uint i = 0; i < numWinners; i++) {
            uint prize = (totalPrize * (numWinners - i)) / numWinners;
            payable(lotteries[lotteryId].winners[i]).transfer(prize);
            numWinners--;
        }
    }

    modifier restricted(uint lotteryId) {
        LotteryInfo storage lottery = lotteries[lotteryId];
        require(msg.sender == lottery.manager, "Only the manager can call this function");
        _;
    }

    function getPlayers(uint lotteryId) public view returns (address[] memory) {
        return lotteries[lotteryId].players;
    }

    function getWinners(uint lotteryId) public view returns (address[] memory) {
        return lotteries[lotteryId].winners;
    }

    function getLotteryInfo(uint lotteryId) public view returns (uint, address, address[] memory, address[] memory, uint, uint, bool) {
        LotteryInfo storage lottery = lotteries[lotteryId];
        return (lottery.id, lottery.manager, lottery.players, lottery.winners, lottery.endTime, lottery.balance, lottery.isActive);
    }

    function getNumWords(uint lotteryId) public view returns(uint32 _numWords) {
        uint numPlayers = lotteries[lotteryId].players.length;
        // Check if numberOfWinners.length is within the uint32 range
        require(numPlayers <= type(uint32).max, "Number of winners exceeds uint32 max value");
        _numWords = uint32(((numPlayers * 10) / 100) + 1);
    }
}