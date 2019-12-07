const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')

const input = JSON.stringify({
  language: 'Solidity',
  sources: {
    Inbox: {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
})

const output = JSON.parse(solc.compile(input))
module.exports = output.contracts['Inbox'].Inbox
