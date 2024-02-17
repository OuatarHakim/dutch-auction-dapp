
"use client";
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import styles from './login.module.css';

const LoginPage: React.FC = () => {
    const [userAddress, setUserAddress] = useState<string>('');
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [accountBalance, setAccountBalance] = useState<string>('');

    useEffect(() => {
        checkMetaMaskInstalled();
    }, []);

    const checkMetaMaskInstalled = () => {
        if (!window.ethereum) {
            console.error('MetaMask not installed');
        }
    };

    const handleLogin = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[3];
                setUserAddress(account);

                const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(ethProvider);

                const ethSigner = ethProvider.getSigner();
                setSigner(ethSigner);

                console.log('User logged in');
            } else {
                console.error('MetaMask not installed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const getAccountBalance = async () => {
        try {
            if (provider && signer) {
                const balance = await provider.getBalance(userAddress);
                const formattedBalance = ethers.utils.formatEther(balance).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                setAccountBalance(formattedBalance);
                console.log('Account Balance:', formattedBalance);
            } else {
                console.error('Provider or Signer not available');
            }
        } catch (error) {
            console.error('Error getting account balance:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Connexion :</h1>
            <button
                className={styles.button}
                onClick={handleLogin}
            >
                Connecter avec MetaMask
            </button>
            {userAddress && (
                <div>
                    <h2 className={styles.subtitle}>User Address: {userAddress}</h2>
                    <button
                        className={styles.button}
                        onClick={getAccountBalance}
                    >
                        Get Account Balance
                    </button>
                    {accountBalance && (
                        <p className={styles.balance}>Account Balance: {accountBalance} ETH</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default LoginPage;
