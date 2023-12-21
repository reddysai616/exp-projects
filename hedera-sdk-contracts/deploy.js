// Import necessary modules
const fs = require('fs');
const { Client, FileCreateTransaction, ContractCreateTransaction, Hbar } = require("@hashgraph/sdk");

// Define your operator ID and key
const operatorId = "0.0.6792467";
const operatorKey = "0x098a308cb7423b3eede0d1a53b726eff8225ddc510ba5ecef47e729d00758075";

// Create a client
const client = Client.forTestnet();
client.setOperator(operatorId, operatorKey);

// Read the contract bytecode
const contractBytecode = fs.readFileSync("your-contract.bin");

// Create a file on Hedera and store the bytecode
const fileCreateTx = new FileCreateTransaction()
    .setContents(contractBytecode)
    .setKeys([operatorKey])
    .setMaxTransactionFee(new Hbar(0.75))
    .freezeWith(client);

const fileCreateSign = await fileCreateTx.sign(operatorKey);
const fileCreateSubmit = await fileCreateSign.execute(client);
const fileCreateRx = await fileCreateSubmit.getReceipt(client);
const bytecodeFileId = fileCreateRx.fileId;
console.log(`- The bytecode file ID is: ${bytecodeFileId} \n`);

// Deploy the contract
const contractTx = await new ContractCreateTransaction()
    .setBytecodeFileId(bytecodeFileId)
    .setGas(2000000);

const contractResponse = await contractTx.execute(client);
const contractReceipt = await contractResponse.getReceipt(client);
const newContractId = contractReceipt.contractId;

console.log("The smart contract ID is " + newContractId);