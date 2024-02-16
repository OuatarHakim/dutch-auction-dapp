
// ProfilePage.tsx
"use client"; 
import React, { useEffect, useState } from 'react';
import Web3 from 'web3'; // Importez Web3.js
import { ethers } from 'ethers'

const ProfilePage: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // État de connexion de l'utilisateur
    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [userBalance, setUserBalance] = useState<string | null>(null);

    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (typeof window !== 'undefined' && window.ethereum) {
                    // Demander l'autorisation à l'utilisateur
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                   
                    if (accounts.length > 0) {
                        const provider = new ethers.providers.Web3Provider(window.ethereum);
                        const userAddress = accounts[0]; // Récupérer la première adresse du tableau
                        setUserAddress(userAddress);
                        setIsLoggedIn(true);
                        // Récupérer le solde ETH de l'utilisateur
                        const balanceInWei = await provider.getBalance(userAddress);
                        const balanceInEth = ethers.utils.formatEther(balanceInWei)
                        setUserBalance(balanceInEth);
                    } else {
                        setIsLoggedIn(false);
                    }
                } else {
                    console.error('MetaMask not installed');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchUserData();
    }, []);
    
    return (
        <div>
            <h1 className="text-3xl font-bold">Profile Page</h1>
            {isLoggedIn ? (
                <div>
                    <p>Bonjour, {userName} !</p>
                    <p>Adresse publique : {userAddress}</p>
                    <p>Solde ETH : {userBalance} ETH</p>
                </div>
            ) : (
                <p>Vous n'êtes pas connecté. Veuillez vous connecter avec MetaMask pour accéder à votre profil.</p>
            )}
        </div>
    );
};

export default ProfilePage;
