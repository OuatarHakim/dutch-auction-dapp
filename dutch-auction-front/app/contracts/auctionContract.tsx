
import { ethers } from 'ethers';

// Adresse du contrat d'enchères
const contractAddress = '0x0485C8FdE186F8eD759dfDb6D8d6C6732A4DD715';

// ABI (Interface binaire du contrat)
const abi = [
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
          "internalType": "uint256",
          "name": "articleIndex",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "bidder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "BidPlaced",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "AUCTION_DURATION",
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
      "inputs": [],
      "name": "PRICE_DECREMENT",
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
      "inputs": [],
      "name": "RESERVE_PRICE",
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
      "inputs": [],
      "name": "STARTING_PRICE",
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
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "articles",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "currentPrice",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "winningBidder",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "closed",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "auctionStartTime",
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
      "inputs": [],
      "name": "auctioneer",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "currentArticleIndex",
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
      "inputs": [],
      "name": "getCurrentPrice",
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
          "internalType": "uint256",
          "name": "articleIndex",
          "type": "uint256"
        }
      ],
      "name": "placeBid",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "moveToNextArticle",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

// Obtenir une instance du contrat
const getContract = (provider: ethers.ContractRunner | null | undefined) => {
  return new ethers.Contract(contractAddress, abi, provider);
};


// Fonction pour placer une enchère
const placeBid = async (provider: ethers.ContractRunner | null | undefined, lotIndex: any | ethers.Overrides, bidAmount: any) => {
  try {
    const contract = getContract(provider);
    // Appeler la fonction du contrat pour placer une enchère
    const tx = await contract.placeBid(lotIndex, { value: ethers.parseEther(bidAmount) });
    await tx.wait(); // Attendre la confirmation de la transaction
    return true; // Enchère placée avec succès
  } catch (error) {
    console.error('Error placing bid:', error);
    return false; // Enchère échouée
  }
};

// Exportez les fonctions nécessaires pour interagir avec le contrat
export { placeBid };
