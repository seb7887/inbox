require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { evm, abi } = require('./compile')

const provider = new HDWalletProvider(
  process.env.SECRET,
  process.env.INFURA_ENDPOINT
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[0])
  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ['Hi there']
    })
    .send({ gas: '10000', from: accounts[0] })
  console.log('Contract deployed to', result.options.address)
}

deploy()
