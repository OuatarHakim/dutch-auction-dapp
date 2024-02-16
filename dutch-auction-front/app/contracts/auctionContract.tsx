
import { ethers } from 'ethers';

// Adresse du contrat d'enchères
const contractAddress = '0x4abd38be16cc29DF1B44Ec6f05013AA6842e675D';

import abi from '../abi.json';


// Obtenir une instance du contrat
const getContract = (provider: ethers.ContractRunner | null | undefined) => {
  return new ethers.Contract(contractAddress, abi, provider);
};


const placeBid = async (provider, articleIndex, bidAmount) => {
  try {
    // Créer une instance du contrat avec le fournisseur (provider)
    const contract = getContract(provider);
    // Appeler la fonction du contrat pour placer une enchère
    const tx = await contract.placeBid(articleIndex, { value: ethers.parseEther(bidAmount) });
    await tx.wait(); // Attendre la confirmation de la transaction
    return true; // Enchère placée avec succès
  } catch (error) {
    console.error('Error placing bid:', error);
    return false; // Enchère échouée
  }
};

// Exportez la fonction pour placer une enchère
export { placeBid };

// Fonction pour créer une nouvelle enchère
const createAuction0 = async ( name, startingPrice, duration) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const contract = getContract(provider);
    const tx = await contract.createAuction(name, startingPrice, duration);
    await tx.wait(); // Attendre la confirmation de la transaction
    return true; // Enchère créée avec succès
  } catch (error) {
    console.error('Error creating auction:', error);
    return false; // Création de l'enchère échouée
  }
};


// Fonction pour estimer les frais de gaz de la méthode 'createAuction'
async function estimateGasCreateAuction(name, startingPrice, duration) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = getContract(provider);
  const gasEstimate = await contract.estimateGas.createAuction(name, startingPrice, duration);
  return gasEstimate;
}
/*
// Fonction pour créer une nouvelle enchère
const createAuction = async (name, startingPrice, duration) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(provider, signer);

    // Estimation des frais de gaz
    const gasEstimate = await estimateGasCreateAuction(name, startingPrice, duration);
    const gasLimit = Math.round(gasEstimate * 1.5); // Ajouter une marge de sécurité de 50%
    const gasFee = await provider.getGasPrice();
    const feeData = { value: gasFee.mul(gasLimit).div(10 ** 9) }; // Convertir le prix du gaz en wei

    // Déploiement de l'enchère
    const tx = await contract.createAuction(name, startingPrice, duration, feeData);
    const receipt = await tx.wait(); // Attendre la confirmation de la transaction

    return {
      success: true,
      transactionHash: receipt.transactionHash,
      gasUsed: receipt.gasUsed,
      cumulativeGasUsed: receipt.cumulativeGasUsed,
      contractAddress: receipt.contractAddress,
      events: receipt.events,
    };
  } catch (error) {
    console.error('Error creating auction:', error);
    return {
      success: false,
      message: error.message,
    };
  }
};


export { createAuction };
*/
// Fonction pour créer une nouvelle enchère
const createAuction = async (name: string, startingPrice:any, duration: any) => {

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    if(provider) {
      try{
        let signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress ,abi,provider);
        const signedTransaction = await signer.sendTransaction({
          to:contract.address,
          value:0,
          data:contract.interface.encodeFunctionData("createAuction", [name, ethers.utils.parseEther(startingPrice), ethers.BigNumber.from(duration)]),
      })
      console.log("hhh")

          await signedTransaction.wait();
      }catch(err){
        console.log(err);
      }
    }
  }catch(err){ 
    console.log(err);
  }
  
};


export { createAuction };


