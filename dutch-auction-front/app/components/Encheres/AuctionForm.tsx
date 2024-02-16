import React, { useState } from 'react';

interface AuctionFormProps {
    onCreateAuction: (auctionData: AuctionData) => void;
}

interface AuctionData {
    name: string;
    description: string;
    startingPrice: number;
    duration: number;
}

const AuctionForm: React.FC<AuctionFormProps> = ({ onCreateAuction }) => {
    const [auctionData, setAuctionData] = useState<AuctionData>({
        name: '',
        description: '',
        startingPrice: 0,
        duration: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAuctionData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreateAuction(auctionData);
        // Réinitialiser les champs après la création de l'enchère
        setAuctionData({
            name: '',
            description: '',
            startingPrice: 0,
            duration: 0,
        });
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Create New Auction</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Auction Name</label>
                    <input type="text" id="name" name="name" value={auctionData.name} onChange={handleChange} placeholder="Enter Auction Name" className="border border-gray-300 rounded-md w-full p-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea id="description" name="description" value={auctionData.description} onChange={handleChange} placeholder="Enter Description" className="border border-gray-300 rounded-md w-full p-2"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="startingPrice" className="block text-gray-700 font-bold mb-2">Starting Price (ETH)</label>
                    <input type="number" id="startingPrice" name="startingPrice" value={auctionData.startingPrice} onChange={handleChange} placeholder="Enter Starting Price" className="border border-gray-300 rounded-md w-full p-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">Duration (minutes)</label>
                    <input type="number" id="duration" name="duration" value={auctionData.duration} onChange={handleChange} placeholder="Enter Duration" className="border border-gray-300 rounded-md w-full p-2" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Create Auction</button>
            </form>
        </div>
    );
};

export default AuctionForm;


