pragma solidity ^0.4.17;
// linter warnings (red underline) about pragma version can igonored!

// contract code will go here

contract Inbox { // defines a contract definition, similar to a class
  string public message; // declares instance variables and their types that will exist in the contract
  
  // defines different functions that will be in this contract
  function Inbox(string initialMessage) public { // this is a constructor function, it is called one time when the contract is deployed to the blockchain
    message = initialMessage;
  }
  
  function setMessage(string newMessage) public { // this is a normal function that we can call after it is deployed to the blockchain
    message = newMessage;
  }
    
}