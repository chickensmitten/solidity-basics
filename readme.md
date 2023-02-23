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
  - `returns (string)` is return types
  - Common function types: public, private, view, constant, pure, payable
  ![common function types](/public/images/01_21_common_function_types.png)