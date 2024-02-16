// pages/login.tsx (ou login.js pour JavaScript)

// LoginPage.tsx
"use client";
// LoginPage.tsx

import React, { useEffect } from 'react';
import { ethers } from 'ethers';

const LoginPage: React.FC = () => {
    useEffect(() => {
        // Vérifier si MetaMask est installé au chargement de la page
        checkMetaMaskInstalled();
    }, []);

    const checkMetaMaskInstalled = () => {
        if (!window.ethereum) {
            console.error('MetaMask not installed');
        }
    };

    
    const handleLogin = async () => {
        try {
            // Vérifier si MetaMask est installé
             if (window.ethereum) {
                  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                  const account = accounts[0];
                  const provider = new ethers.providers.Web3Provider(window.ethereum);
                  const signer = provider.getSigner()
                  console.log('User logged in');
              } else {
                  console.error('MetaMask not installed');
              }
            
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold">Login Page</h1>
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin}
            >
                Login with MetaMask
            </button>
        </div>
    );
};

export default LoginPage;
