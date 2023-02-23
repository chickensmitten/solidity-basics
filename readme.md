# Solidity Basics

## What is Ethereum Intro
- Click here for [Intro](/public/articles/intro.md)

## Intro to Solidity
- Solidity programming language
  - strongly types
  - relatively similar to Javascript
  - written in `.sol` files
  - Contract definition is what we write, then we deploy to a solidity compiler will create an ABI and bytecode
  ![abi bytecode](/public/images/01_17_abi_bytecode.png)
  - Javascript code interacts with ABI, which then translates and interacts with bytecode
  ![abi bytcode interaction](/public/images/01_17_abi_bytecode_interaction.png)
- `contract` folder is where the `.sol` contract code is written
- `scripts` folder is where the deploy code is written
- Contract Structure
  - code
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
- Function structure
  - code
  ```
  function getMessage() public view returns (string) { 
    return message;
  }
  ```
  - `getMessage()` is a function name
  - `public view` is a function type
  - `returns (string)` is to specify the type of return value. It is used for constant and view function types
  - Common function types: public, private, view, constant, pure, payable
    - public: anyone can call this function
    - private: only this contract can call this function
    - view: this function returns data and does not modify the contract data. Same as below.
    - constant: this function returns data and does not modify the contract data. Same as above.
    - pure: function will not modify or even read the contract's data
    - payable: when someone call this function, they might send ether.
- Deploying the contract
  - Steps: Contract source code -> compile to bytecode -> deploy to a network (test or main). In remix, you can deploy to "JavaScript VM"
  - Behind the scenes for deployment
- Deploying contract transaction
  - Notice that `to` is blank, the ethereum network will assume that this transaction is used to create a contract.
  - Inputs in `value` allows us to create a contract and send some "Wei" to the contract address in one transaction.
  ![create contract](/public/images/01_25_create_contract.png)
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

## Smart Contracts
- Deployment of smart contracts using Truffle. Truffle also allows for contract creation and local testing.
