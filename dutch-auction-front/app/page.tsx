// pages/index.js (ou index.tsx pour TypeScript)
"use client";

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
const contractAddress = '0x1dAb2ec2FB9668F29045444eCb121eF758055fC2';

const HomePage : React.FC = () => {
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
      const contract = new ethers.Contract(contractAddress, DutchAuctionABI, ethProvider.getSigner());
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
      <div>
        <div>
          <h2>Enchères Gagnées</h2>
          {auctionsWon.map((article, index) => (
            <div key={index}>
              <p>{article.name}</p>
              <p>Acheté</p>
            </div>
          ))}
  
          <h2>Enchères Perdues</h2>
          {auctionsLost.map((article, index) => (
            <div key={index}>
              <p>{article.name}</p>
              <p>Non Acheté</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default HomePage;
