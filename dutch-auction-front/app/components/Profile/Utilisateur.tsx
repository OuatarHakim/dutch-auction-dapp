import React from 'react';

interface UtilisateurProps {
    address: string;
    balance: string;
}

const Utilisateur: React.FC<UtilisateurProps> = ({ address, balance }) => {
    return (
        <div className="user-profile">
            <h2 className="text-xl font-semibold mb-4">Utilisateur </h2>
            <p><span className="font-semibold">Address:</span> {address}</p>
            <p><span className="font-semibold">Balance:</span> {balance} ETH</p>
        </div>
    );
};

export default Utilisateur;
