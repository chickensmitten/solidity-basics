const path = require('path');
const fs = require('fs');
const solc = require('solc');
 
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');
 
const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts);

// // returns the following
// {
//   'Inbox.sol': {
//     Inbox: {
//       abi: [Array],
//       devdoc: [Object],
//       evm: [Object],
//       ewasm: [Object],
//       metadata: '{...}',
//       storageLayout: [Object],
//       userdoc: [Object]
//     }
//   }
// }

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'Inbox.sol'
].Inbox;