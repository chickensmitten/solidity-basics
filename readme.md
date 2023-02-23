# Solidity Basics

## Intro
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

### Solidty Gotchas
- Duplicate Function
  Whenever you define a storage variable like `string public message` with `public` key word, the contract will automatically create a function that allows others to access it. notice that it is similar to `getMessage`. As shown below in remix.
  ![public type gotcha](/public/images/01_23_public_type_gotcha.png)
