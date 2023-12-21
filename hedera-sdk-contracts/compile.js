const fs = require('fs');
const solc = require('solc');

try {
  const contract1Source = fs.readFileSync('./contract.sol', 'utf8');

  const input = {
      language: 'Solidity',
      sources: {
          'contract1.sol': {  // Corrected to .sol
              content: contract1Source,
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

  const compiledContracts = JSON.parse(solc.compile(JSON.stringify(input)));

  fs.writeFileSync('compiledContracts.json', JSON.stringify(compiledContracts));

  console.log("Contracts compiled successfully.");
} catch (error) {
  console.error("Error compiling contracts: ", error);
}