# What is Ethereum Intro
- Lessons are from Stphen Grider, 
Ethereum and Solidity: The Complete Developer's Guide in Udemy
- [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf)
- [Ethereum: The Ultimate Smart Contract and Decentralized Application Platform](http://web.archive.org/web/20131228111141/http://vbuterin.com/ethereum.html)
- Explanation for Ethereum Network
![Explanation of Ethereum Network](/public//images/01_05_ethereum_network.png)
- For developers, web3.js or ether.js is used to interact with the ethereum network. Consumers will use metamask to interact with ethereum network.
- Metamask:
  - How Metamask Works
  ![How Metamask Works](/public/images/01_09_how_metamask_works.png)
  - MetaMask Funds
  ![Metamask Funds](/public/images/01_11_metamask_funds.png)
  - MetaMask Actions
  ![Metamask Actions](/public/images/01_11_metamask_action_steps.png)
  - Metamask Transactions
  ![Metamask Transactions](/public/images/01_11_metamask_transaction_details.png)
- For explanation of [how blockchain works](https://andersbrownworth.com/blockchain/). Proof of Work is like you are given a set of dices and ask to keep rolling it until you get a number lower than the target number.
  - This is the amount of guesses it takes to guess the the block for "hi there" 
  ![Block time](/public/images/01_15_block_time.png)
  - This explains what happens when the hash target is too high, then the min target will be raised so that the blocks will be guessed within a time frame. i.e. bitcoin difficulty adjustment can be raised or lowered to keep within 10 minute blocks. It needs to be adjusted to meet the actual computing availability of the network.
  ![Block time target](/public/images/01_15_block_time_target.png)
  - [Ethereum's block time](https://etherscan.io/chart/blocktime)
- Smart contracts are accounts controlled by code.
  - External Accounts are accounts that are controller by humans, i.e. like metamask wallet that can access different networks. Contract accounts are only created for specific network, i.e. smart contract in Goerli network or mainnet network.
  ![external accounts vs contract accounts](/public//images//01_16_external_acc_vs_contract_acc.png)
  - Contract source code serves as a class that create instance or copies of that class and deploy them to a network. Relationship is like a class and an instance.
  ![contract source contract instance](/public/images/01_16_contract_source_contract_instance.png)
  ![class and instance](/public/images/01_16_class_instance.png)