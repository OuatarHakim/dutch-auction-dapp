import React from 'react';
import Web3 from 'web3'; // Importez Web3.js

interface LogoutButtonProps {
    onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
    const handleLogout = () => {
        // Déconnexion de MetaMask
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            web3.currentProvider.disconnect();
        }
        // Appel de la fonction de déconnexion fournie par le parent
        onLogout();
    };

    return (
        <button
            className="ml-4 text-white hover:text-gray-400"
            onClick={handleLogout} // Utilisez la nouvelle fonction de déconnexion
        >
            Logout
        </button>
    );
};

export default LogoutButton;

