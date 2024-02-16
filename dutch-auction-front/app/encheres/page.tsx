// pages/enchere.tsx
"use client";
/*import React, { useState, useEffect } from 'react';
import AuctionForm from '../components/Encheres/AuctionForm';

interface Auction {
    id: number;
    name: string;
    description: string;
    startingPrice: number;
    duration: number;
}

const EncherePage: React.FC = () => {
    const [auctions, setAuctions] = useState<Auction[]>([]);

    // Fonction pour charger la liste des enchères depuis le serveur
    const loadAuctions = async () => {
        // Code pour charger les enchères depuis le serveur (API, base de données, etc.)
        // Exemple simplifié pour l'instant
        const dummyAuctions: Auction[] = [
           
        ];
        setAuctions(dummyAuctions);
    };

    // Charger la liste des enchères au chargement de la page
    useEffect(() => {
        loadAuctions();
    }, []);

    // Fonction pour créer une nouvelle enchère
    const handleCreateAuction = (newAuction: Auction) => {
        // Code pour créer une nouvelle enchère sur le serveur (API, base de données, etc.)
        // Exemple simplifié pour l'instant
        setAuctions(prevAuctions => [...prevAuctions, newAuction]);
    };

    return (
        <div>
            <h1>Liste des enchères</h1>
            <ul>
    {auctions.map(auction => (
        <li key={auction.id}>
            <h2>{auction.name}</h2>
            <p>{auction.description}</p>
            <p>Prix de départ: {auction.startingPrice} €</p>
            <p>Durée: {auction.duration} minutes</p>
        </li>
    ))}
</ul>
            <h2>Créer une nouvelle enchère</h2>
            <AuctionForm onCreateAuction={handleCreateAuction} />
        </div>
    );
};

export default EncherePage;


import React, { useState } from 'react';
import { placeBid } from '../contracts/auctionContract';
import { ethers } from 'ethers';

const CreateAuctionForm = () => {
    const [formData, setFormData] = useState({
        articleName: '',
        startingPrice: '',
        bidAmount: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner();
            const success = await placeBid(provider, formData.articleIndex, formData.bidAmount);
            if (success) {
                alert('Enchère placée avec succès');
                // Réinitialiser le formulaire
                setFormData({ articleName: '', startingPrice: '', bidAmount: '' });
            } else {
                alert('Échec de la création de l\'enchère');
            }
        } catch (error) {
            console.error('Erreur lors de la création de l\'enchère:', error);
            alert('Erreur lors de la création de l\'enchère');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Créer une nouvelle enchère</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="articleName" className="block text-gray-700 font-bold mb-2">Nom de l'article:</label>
                <input type="text" id="articleName" name="articleName" value={formData.articleName} onChange={handleChange} className="border border-gray-300 rounded-md w-full p-2 mb-4" />
                <label htmlFor="startingPrice" className="block text-gray-700 font-bold mb-2">Prix de départ (ETH):</label>
                <input type="text" id="startingPrice" name="startingPrice" value={formData.startingPrice} onChange={handleChange} className="border border-gray-300 rounded-md w-full p-2 mb-4" />
                <label htmlFor="bidAmount" className="block text-gray-700 font-bold mb-2">Montant de l'enchère (ETH):</label>
                <input type="text" id="bidAmount" name="bidAmount" value={formData.bidAmount} onChange={handleChange} className="border border-gray-300 rounded-md w-full p-2 mb-4" />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Créer l'enchère</button>
            </form>
        </div>
    );
};

export default CreateAuctionForm;

*/

import React, { useState } from 'react';
import { createAuction } from '../contracts/auctionContract';
import { ethers } from 'ethers';


const CreateAuctionForm = () => {
    const [formData, setFormData] = useState({
        articleName: '',
        startingPrice: 0.0,
        duration: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await createAuction(formData.articleName, formData.startingPrice, formData.duration);
            if (success) {
                alert('Enchère créée avec succès');
                // Réinitialiser le formulaire
                setFormData({ articleName: '', startingPrice: 0.0, duration: 0 });
            } else {
                alert('Échec de la création de l\'enchère');
            }
        } catch (error) {
            console.error('Erreur lors de la création de l\'enchère:', error);
            alert('Erreur lors de la création de l\'enchère');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Créer une nouvelle enchère</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="articleName" className="block text-gray-700 font-bold mb-2">Nom de l'article:</label>
                <input type="text" id="articleName" name="articleName" value={formData.articleName} onChange={handleChange} className="border border-gray-300 rounded-md w-full p-2 mb-4" />
                <label htmlFor="startingPrice" className="block text-gray-700 font-bold mb-2">Prix de départ (ETH):</label>
                <input type="float" id="startingPrice" name="startingPrice" value={formData.startingPrice} onChange={handleChange} className="border border-gray-300 rounded-md w-full p-2 mb-4" />
                <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">Durée de l'enchère (en minutes):</label>
                <input type="int" id="duration" name="duration" value={formData.duration} onChange={handleChange} className="border border-gray-300 rounded-md w-full p-2 mb-4" />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Créer l'enchère</button>
            </form>
        </div>
    );
};

export default CreateAuctionForm;
