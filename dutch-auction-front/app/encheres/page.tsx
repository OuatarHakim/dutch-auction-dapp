"use client"; 
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../abi.json';
import "./encheres.module.css"
const contractAddress = "0xB2707c96D812dea2374E20A02D8e7336137E59bc";
declare global {
  interface Window {
      ethereum?: any; // Déclarez la propriété 'ethereum' comme optionnelle
  }
}
const EncheresPage: React.FC = () =>{
  const [userAddress, setUserAddress] = useState<string>('');
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [auctionsWon, setAuctionsWon] = useState<any[]>([]);
  const [auctionsLost, setAuctionsLost] = useState<any[]>([]);

  useEffect(() => {
    const connectMetaMask = async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this feature.");
        return;
      }
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setUserAddress(account);

        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethProvider);
        fetchAuctions(ethProvider);
      } catch (error) {
        console.error('An error occurred during MetaMask connection:', error);
      }
    };

    connectMetaMask();
  }, []);

  const fetchAuctions = async (ethProvider: ethers.providers.Web3Provider) => {
    const contract = new ethers.Contract(contractAddress, abi, ethProvider.getSigner());
    try {
      const auctions = await contract.getAuctions(); 
      classifyAuctions(auctions, ethProvider);
    } catch (error) {
      console.error('Failed to fetch auctions:', error);
    }
  };

  const classifyAuctions = async (auctions: any[], ethProvider: ethers.providers.Web3Provider) => {
    const won: any[] = [];
    const lost: any[] = [];
    const signerAddress = await ethProvider.getSigner().getAddress();

    auctions.forEach((auction) => {
      auction.articles.forEach((article: any) => {
        if (article.closed) {
          if (article.winningBidder.toLowerCase() === signerAddress.toLowerCase()) {
            won.push(article);
          } else {
            lost.push(article);
          }
        }
      });
    });

    setAuctionsWon(won);
    setAuctionsLost(lost);
  };

  return (
    <div className="enchereContainer">
      <div className="enchereColumn">
        <h2 className="enchereTitle">Enchères Gagnées</h2>
        <div>
          {auctionsWon.map((article, index) => (
            <div key={index} className="enchereArticle">
              <p className="enchereArticleName">{article.name}</p>
              <p className="enchereArticleStatus">Acheté</p>
            </div>
          ))}
        </div>
      </div>

      <div className="enchereColumn">
        <h2 className="enchereTitle">Enchères Perdues</h2>
        <div>
          {auctionsLost.map((article, index) => (
            <div key={index} className="enchereArticle">
              <p className="enchereArticleName">{article.name}</p>
              <p className="enchereArticleStatus">Non Acheté</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EncheresPage;
