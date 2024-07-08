## Introduction

**LotX** is a decentralized lottery application built on Ethereum. It aims to provide a fair and transparent lottery system using blockchain technology. The key components of this project include the use of ChainLink VRF for secure randomness.

## Technical Decisions and Trade-offs

Due to personal reasons, and time constraints, certain trade-offs and decisions were made to ensure timely completion. Here, we outline these decisions and the reasoning behind them.

### MULTICALLS
- **LotteryInfo and WinnerInfo Multicall** - To avoid storing large arrays of all players and winners in storage, they were stored using mapping as reference to each lottery a participant took in. This all info were muticall only once using their respective id, and all details were retrieve for each call at a time.


### ChainLink VRF for Secure Randomness

##### Reason for Using ChainLink VRF:
- **Predictability Prevention**: On-chain randomness is challenging due to the deterministic nature of blockchain. Using predictable values like `block.timestamp` or `keccak256` hashing can be manipulated, compromising the fairness of the lottery.
- **Security**: ChainLink VRF (Verifiable Random Function) provides a secure and verifiable source of randomness, ensuring that the results cannot be tampered with or predicted by any participants or even the contract creator.

#### Trade-off:
- **Complexity and Dependency**: Incorporating ChainLink VRF adds complexity and reliance on an external oracle service. This introduces a dependency that must be maintained and paid for, but the trade-off is justified by the enhanced security and integrity of the lottery system. 
CHECK IN THE hook folder for
```bash 
    useLottery.ts
```
This process is efficient and faster, while it's cost efficient oon contract side, as large arrays won't be manipulated and send into everytime.


### CONTRACT UNOPTIMIZED and NOT COST EFFICIENT

USE OF: 

- UNCHECKED ARRAY LENGTH
- MODIFIER SIDE EFFECTS INSTEAD OF PRIVATE FX
- CHECKED ARITHMETIC IN LOOP
- SIMILAR DATATYPES CAN BE PACKED TOGETHER	
- USED ADDRESS(THIS).BALANCE but could use SELFBALANCE() INSTEAD
- NAMED RETURN OF LOCAL VARIABLE SAVES GAS AS COMPARED TO RETURN STATEMENT
- GAS OPTIMIZATION ON INCREMENTS
- COSTLY CONDITIONAL OPERATORS & CHEAPER INEQUALITIES WERE NOT USED REQUIRE() & CUSTOM ERRORS ARE BETTER
- FUNCTION SHOULD RETURN STRUCT
- STORAGE VARIABLE CACHING IN MEMORY, SOME ASSEMBLY CODES WOULD HAVE HELP DONE BETTER TO AVOID READING STORAGE VARIABLES OFTEN
-

### MISSING IMPORTANT EVENTS AND MISSING INDEXED KEYWORDS IN EVENTS 

### Real-time Updates on Front-end with Block Proposals - SHOULD DEPEND ON EVENTS EMMITTED INSTERAD

- **Real-time Updates:** This hook leverages WebSocket connections to listen for new blocks on the Ethereum network. Each block proposal triggers an update, ensuring the application reflects the most current state of the blockchain.
- **Simplicity:** Implementing this hook is straightforward and provides immediate feedback to users without needing to poll for updates.

- **Performance:** Continuously listening for new blocks can be resource-intensive and may impact performance. However, this method was chosen because application size is relatively fast and it's for fast build. Events emmitted from functions should be depended on for updates.

### State Management with Zustand or Redux Toolkit
- **Did not use Zustand/Redux Toolkit:** State management libraries like Zustand or Redux Toolkit offer predictable state updates and make the application more maintainable. They help manage the state efficiently, especially in a complex application like a decentralized lottery. This will be efficiently setUp on other cases.


### Other Excluded Features Due to Time Constraints
- **Detailed Error Handling:** While basic error handling is implemented, a more robust solution involving user-friendly error messages and logging could not be completed within the timeframe.
- **Advanced UI/UX Enhancements:** The focus was on functionality rather than advanced design and user experience improvements. Future iterations can address these aspects.
- **Extensive Testing:** Comprehensive testing, including unit tests and integration tests, were limited. Future development should prioritize thorough testing to ensure reliability.

### Conclusion
This project demonstrates a secure and fair decentralized lottery application using Ethereum. 


## Deployed Contract

- https://sepolia.etherscan.io/address/0xf89ffb84729ea0e575e03486df846d5a5cf323cc