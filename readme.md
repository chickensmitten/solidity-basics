# Solidity Basics
> !!! Note, some of the code here has been deprecated, but the core lessons still remain.

## What is Ethereum Intro
- Click here for [Intro](/public/articles/intro.md)

## Intro to Solidity
### Solidity programming language
- strongly typed
- relatively similar to Javascript
- written in `.sol` files
- Contract definition is what we write, then we deploy to a solidity compiler will create an ABI and bytecode
![abi bytecode](/public/images/01_17_abi_bytecode.png)
- Javascript code interacts with ABI, which then translates and interacts with bytecode
![abi bytcode interaction](/public/images/01_17_abi_bytecode_interaction.png)

### Solidity Types
- Basic Solidity types below. There are more complex types
  - `string`: sequence of characters
  - `bool`: boolean value
  - `int`: integer, positive or negative, has no decimal. `0`, `-3000`, `23`
    - `int8`: values of lower bound with -128, upper bound with 127
    - `int16`: values of lower bound with -32768, upper bound with 32767
    - ...
    - `int256`: value of really really large negative number to really really big positive number
  - `uint`: unsigned interger, positive numver only, has no decimal. `0`, `3000`, `453`
    - `uint8`: values of lower bound with 0, upper bound with 127
    - `uint16`: values of lower bound with 0, upper bound with 32767
    - ...
    - `uint256`: 0 to really really big number  
  - `fixed/ufixed`: fixed point number, number with a decimal after it. `20.001`, `-42.4242`
  - `address`: has methods tied to it for sending money. `0x123jfekjehc8934ekfdk`
- Reference Types
  - `fixed array`: array that contains a single type of element. has an unchanging length. `int[3] => [1,2,3]`, `bool[2] => [true, false]`
  - `dynamic array`: array that contains a single type of element. Size can change. `int[] => [9,2,6,5]`, `bool[] => [true, true, false]`
  - `mapping`: collection of key value pairs. i.e. Javascript objects, Ruby hashes, Python dictionary. `mapping(string => string)` or `mapping(int => bool)`. Use a ,mapping to represent many things like a mapping of strings, ints or structs.
  - `struct`: collection of key value pairs that can have different types. Use a struct to represent singular things.
  ```
  strut Car {
    string make;
    string model;
    uint value;
  }
  ```

### Global Variables
- `msg.data`: data field from the call or transaction that invoked the current function
- `msg.gas`: amount of gas the current function invocation has available
- `msg.sender`: address of the account that started the current function invocation
- `msg.value`: amount of ether (in wei) that was sent along with the function invocation
- `require()`: an error handling global function in solidity in which if the condition within is true then continue running code.

### Function structure
  - function codes
  ```
  function getMessage() public view returns (string) { 
    return message;
  }
  ```
  - `getMessage()` is a function name
  - `public view` is a function type
  - `returns (string)` is to specify the type of return value. It is used for constant and view function types
  - Common function types: public, private, view, constant, pure, payable
    - `public`: anyone can call this function. Note, it has been replaced by `memory`
    - `private`: only this contract can call this function
    - `view`: this function returns data and does not modify the contract data. Same as below.
    - `constant`: this function returns data and does not modify the contract data. Same as above.
    - `pure`: function will not modify or even read the contract's data
    - `payable`: when someone call this function, they might send ether.
- Updating any value (create contract, write on smart contract or modify anything) on the blockchain involves a transaction and the transaction have to wait for its block to be verified. Refer to image below:
  ![running functions](/public/images/01_25_running_functions.png)
- Wei vs Gwei vs Ether. It is different unit of measurement
- Gas and Transaction.
  - `gasPrice` is the amount of Wei the sender is willing to pay to process the transaction
  - `startGas/gasLimit` is the units of gas that this transaction can consume
  - Code example:
  ```
  function doMath(int a, int b) {
    a + b;
    b - a;
    a * b;
    a == 0;
  }
  ```
  - You set a gasPrice of 300 and a gasLimit of 20. 
  ![gas transaction](/public/images/01_28_gas_transaction.png)
  - This is the outcome of the calculation
  ![gas calculation](/public/images/01_28_gas_calculation.png)

### Require
- Validation with `require();`
  - example validation code
  ```
  function enter() public payable {
    require(msg.value > 0.1 ether); // this means the person using the current function needs to send some eth value, before their address can be added to `address[]`

    players.push(msg.sender);
  }
  ```

### Modifier
- `modifier` changes a function when it is called in it
- It can be used to help with repetitive logic
- `_;` in a `modifier` means run the rest of the code.
- Code example below, add `require();` to all relevant functions with `modifier`. in the code below a `modifier` with the name `restricted()` is created. So long as a function calls `restricted()` in it. the `require()` function will come into effect.
```
  function pickWinner() public restricted {
    uint index = random() % players.length;
    players[index].transfer(this.balance);
    players = new address[](0);
  }
  
  modifier restricted() {
    require(msg.sender == manager);
    _;
  }
```

### Mnemonic Phrases
- Mnemonic Phrases is a 12 word mnemonic. When fed into a BIP39 mnemonic algorithm, it will create all your accounts with addresses, private key and public key.
  - A wallet can have many accounts
  ![accounts](/public/images/01_29_accounts.png)
  - Every account will have an address, public key and private key
  ![accounts](/public/images/01_29_accounts_pk_pb_add.png)

## Solidity Gotchas
- ***Duplicate Function***: Whenever you define a storage variable like `string public message` with `public` key word, the contract will automatically create a function that allows others to access it. notice that it is similar to `getMessage`. As shown below in remix.
  ![public type gotcha](/public/images/01_23_public_type_gotcha.png)
- ***Modifying Transaction Doesn't Return a Value***: It only returns a transaction hash aka transaction id. Even if we add `returns (string)` and `return message;`.
```
  function setMessage(string newMessage) public returns (string) {
    message = newMessage;
    return message;
  }
```
- ***No Nested Dynamic Arrays***: Below is an example of a nested dynamic array.
```
const myArray = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];
```
Nested dynamic arrays in solidity cannot bridge to ABI/JS/Web3 world. We cannot communicate and translate in nested dynamic arrays.

## Smart Contracts
> **Older Libraries**: The libaries used in this section maybe deprecated, but the essence of the lessons remain the same. Refer to [update inbox project files](/public/articles/update_inbox_project.md) 

### Anatomy of a smart contract
- Contract structure
  - declare variables with types
  - create a constructor
  - create methods with validations
  - fallback
- Contract Structure Code example
  ```
  pragma solidity ^0.4.17; // specify solidity code

  contract Inbox { // defines a contract definition, similar to a class
      string public message; // declares instance variables and their types that will exist in the contract
      
      // defines different functions that will be in this contract
      function Inbox(string initialMessage) public { // this is a constructor function, it is called one time when the contract is deployed to the blockchain
          message = initialMessage;
      }
      
      function setMessage(string newMessage) public { // this is a normal function that we can call after it is deployed to the blockchain
          message = newMessage;
      }
      
      function getMessage() public view returns (string) { // this is a normal function that we can call after it is deployed to the blockchain
          return message;
      }
      
  }
  ```

### Deployment
- Deployment of smart contracts using Truffle. Truffle also allows for contract creation and local testing.
- Deploying the contract
  - Steps: Contract source code -> compile to bytecode -> deploy to a network (test or main). In remix, you can deploy to "JavaScript VM"
  - Behind the scenes for deployment
- Deploying contract transaction
  - Notice that `to` is blank, the ethereum network will assume that this transaction is used to create a contract.
  - Inputs in `value` allows us to create a contract and send some "Wei" to the contract address in one transaction.
  ![create contract](/public/images/01_25_create_contract.png)
- Deploying Smart Contract: For the smart contract to work we need a boilerplates that can do the following:
  1. Write solidity code in a Javascript project
    - Solution: Set up Solidity compiler in npm packages. Or in the future in ReactJS or NextJS framework
  2. Rapidly test contracts without doing manual testing
    - Solution: Use custom Mocha test runner
  3. Compile then deploy contract to the public networks
    - Solution: Setup a compile and deploy script
- Project Directory:
  - Contracts folder: this contains `.sol` files
  - Test folder: this contacts `.test.js` files
  - `package.json` is for dependencies in project
  - `compile.js` is to compile code
  - `deploy.js` is to take compile code and deploy to a network
1. Installation
  - setup `npm init`
  - install `npm install mocha ganache-cli solc` etc etc. refer to [package.json](/package.json)
- Steps to write smart contract:
  1. First, put your contract to [Inbox.sol](/contracts/Inbox.sol).
  2. Then, run `node compile.js`  or run the compile script from `package.json` to start compiling. Refer to [compile.js](/compile.js) for more information on how the compilation works. `console.log(solc.compile(source, 1));` will return the `interface` aka ABI, there is also `bytecode`. It should return the following. The `error` basically says that the contract's `constructor` method is deprecated and should use the new one. 
  ```
  {
    contracts: {
      ':Inbox': {
        assembly: [Object],
        bytecode: '608 ... 060',
        functionHashes: [Object],
        gasEstimates: [Object],
        interface: '[{ ... }]',
        metadata: '{ ... },"version":1}',
        opcodes: 'PUSH1 0x80 ... PUSH12 0x550F2A8091269A3294CB0029 ',
        runtimeBytecode: '60806 ... 4cb0029',
        srcmap: '127:769:0:- ... ;;;;;;'
      }
    },
    errors: [
      ':10:3: Warning: Defining constructors as functions with the same name as the contract is deprecated. Use "constructor(...) { ... }" instead.\n' +
        '  function Inbox(string initialMessage) public { // this is a constructor function, it is called one time when the contract is deployed to the blockchain\n' +
        '  ^ (Relevant source part starts here and spans across multiple lines).\n'
    ],
    sourceList: [ '' ],
    sources: { '': { AST: [Object] } }
  }
  ```
  3. Testing Steps:
    > **TDD Driven Development**: Writing solidity code is very much a TDD process. Write the test first, then write the solidity code, then run test.
    - To first test, have to setup a local test network with Ganache
    - Then write code in [Inbox.test.js](/test/Inbox.test.js)
    - run `npm run test` to test the contract
    - For more code examples check [Lottery.test.js](https://github.com/chickensmitten/solidity-lottery/blob/main/test/Lottery.test.js)
  4. Deploying Steps:
    - Refer to [deploy.js](/deploy.js)
    - environment variable
      - Ensure that you have install `npm i dotenv`
      - Then in the `.env` file, add the relevant variables
      - Add `require('dotenv').config()` in `deploy.js`
      - Then use `process.env.ENV_VARIABLE` or something similar to put in environment variable
    - run `node deploy.js` or run the deploy script from `package.json`
- Web3 Providers
  > **Web3 Versioning Isses**: Newer version of web3 supports promises and async/await. Older version before `v0.x.x` doesn't and uses callback functions for async code. Can consider `ether.js` as alternative.
  - Web3.js is a collection of libraries that allow developers to interact with a remote or local Ethereum node using HTTP, IPC, or WebSocket
  - `const Web3 = require("web3");` to create an instance of web3
  - Then use a provider `const web3 = new Web3(ganache.provider());` to communicate between the test network like ganache and web3

### How Metamask works with your web browser
- Whenever Metamask is running in your browser, it automatically injects web3 library into any active page. Can verify this by typing `web3` in browser console
- This allows us to instantly get access to a copy of web3 that points to a blockchain network.