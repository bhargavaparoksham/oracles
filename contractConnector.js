const ethTx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const dotenv = require('dotenv').config()
var url = process.env.RINKEBY


const testnet = new Web3(url)

const acc1 = process.env.ACCOUNT_1
const acc2 = process.env.ACCOUNT_2

const key1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const key2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')


//Contract Address is from Rinkeby
//Contract ABI is from truffle project -> Build folder -> ABI

const contractAddress= '0x28335701fa793e7745b8e60d1def5fe3ffdb5f53'
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "randomNum",
          "type": "uint256"
        }
      ],
      "name": "RandomNumberGenerated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "randomResult",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "randomness",
          "type": "uint256"
        }
      ],
      "name": "rawFulfillRandomness",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRandomNumber",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]



//Instantiate Contract  

var _contract = new testnet.eth.Contract(contractABI,contractAddress)
 

//Write to smart contract

testnet.eth.getTransactionCount(acc1, (err, txCount) => {

  //Get Smart Contract Data

  const Data = _contract.methods.getRandomNumber().encodeABI()

  //Transaction Data

   //console.log(txCount)
  const tx = new ethTx({ 
    nonce: testnet.utils.toHex(txCount), 
    gasLimit: testnet.utils.toHex(1000000), 
    gasPrice: testnet.utils.toHex(testnet.utils.toWei('10','gwei')),
    to: contractAddress,
    data: Data}, 
    {chain:'rinkeby'})

  //Sign the transaction
  tx.sign(key1)
  const serialTx = tx.serialize() //raw needs to be serialized
  const raw = '0x' + serialTx.toString('hex')

  //Broadcast the transaction 
  testnet.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('Error: ',err,'Transaction Successful, txHash: ',txHash)

  })


})



//Read from smart contract

async function contractCall() {

  var randomNum = await _contract.methods.randomResult().call()
  console.log("Random Number Generated: " +randomNum)

}

contractCall();





