// const { Client, AccountId } = require('@hashgraph/sdk');
// const { ContractCreateTransaction } = require('@hashgraph/sdk');

// // Set up the operator account details
// const operatorPrivateKey = '0x6644b6b93f8a1152937ad11d9a7951ec0760d0854b16e892423965241bda2401';
// const operatorAccount = AccountId.fromString('0.0.5950458');
// // const accountId = AccountId.fromString("<shardNum>.<realmNum>.<accountNum>");
// // const accountIdFromSolidity = AccountId.fromSolidityAddress("<address>");

// // Create the Hedera client
// const hederaClient = new Client({
//     network: {
//         'https://testnet.hashio.io/api': {
//             shard: 0,
//             realm: 0,
//             account: 0,
//         },
//     },
//     operator: {
//         account: operatorAccount,
//         privateKey: operatorPrivateKey,
//     },
// });

// // Deploy a smart contract
// async function deployContract(contractName) {
//     const bytecode = require(`./compiledContracts.json`).contracts[contractName][contractName].evm.bytecode.object;
//     const gas = 5000000;

//     // Create a contract creation transaction
//     const contractCreateTx = new ContractCreateTransaction()
//         .setGas(gas)
//         .setBytecode(bytecode)
//         .setAdminKey(hederaClient.operatorPublicKey);

//     // Set the operator account ID as the payer account
//     contractCreateTx.setPayerAccountId(hederaClient.operatorAccountId);

//     // Execute the transaction
//     const txId = await contractCreateTx.execute(hederaClient);

//     // Get the transaction receipt
//     const receipt = await txId.getReceipt(hederaClient);

//     // Return the contract ID
//     return receipt.getContractId();
// }

// // Deploy the contract and log the contract address
// async function deployAndLogContract() {
//     const contractName = 'SampleContract1';
//     const contractAddress = await deployContract(`compiledContracts/${contractName}`);
//     console.log(`${contractName} Address:`, contractAddress);
// }

// // Call the function to deploy and log the contract
// deployAndLogContract();


// import { ContractCreateFlow, Client} from '@hashgraph/sdk';

// export const deployContract = async (client: Client, bytecode: string | Uint8Array, gasLimit: number) => {
//  const contractCreateFlowTxn = new ContractCreateFlow()
//    .setBytecode(bytecode)
//    .setGas(gasLimit);
 
//  console.log(`- Deploying smart contract to Hedera network`)
//  const txnResponse = await contractCreateFlowTxn.execute(client);
 
//  const txnReceipt = await txnResponse.getReceipt(client);
//  const contractId = txnReceipt.contractId;
//  if (contractId === null ) { throw new Error("Somehow contractId is null.");}
 
//  const contractSolidityAddress = contractId.toSolidityAddress();
 
//  console.log(`- The smart contract Id is ${contractId}`);
//  console.log(`- The smart contract Id in Solidity format is ${contractSolidityAddress}\n`);
 
//  return [contractId, contractSolidityAddress];
// }

const { Client, ContractCreateTransaction, Hbar } = require("@hashgraph/sdk");
const myAccountId = "0.0.6792467"; // replace with your actual account ID
const myPrivateKey = "302e020100300506032b657004220420098a308cb7423b3eede0d1a53b726eff8225ddc510ba5ecef47e729d00758075"; // replace with your actual private key

// Create your Hedera client
const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

// Read the compiled bytecode of your smart contract
const fs = require('fs');
const bytecode = fs.readFileSync("./compiledContracts.json", "utf8");

// Create a new smart contract with the bytecode
async function createSmart() {
  try {
    const contractTx = await new ContractCreateTransaction()
      .setGas(500000) // Set a large enough gas limit
      .setBytecode(bytecode)
      .execute(client);

    // Get the receipt of the transaction
    const contractReceipt = await contractTx.getReceipt(client);

    // Get the contract ID
    const newContractId = contractReceipt.contractId;

    console.log("The new contract ID is " + newContractId);
  } catch (error) {
    console.error("Error deploying contract: ", error);
  }
}

createSmart();