import React from 'react';

const ListEcheresGagnantes: React.FC = () => {
    // Exemple de liste d'enchères remportées
    const winningAuctions = [
        { name: 'Item 1', price: 100 },
        { name: 'Item 2', price: 150 },
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Winning Auctions</h2>
            <ul>
                {winningAuctions.map((auction, index) => (
                    <li key={index} className="flex justify-between items-center border-b py-2">
                        <span className="text-gray-800">{auction.name}</span>
                        <span className="text-green-600 font-semibold">${auction.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListEcheresGagnantes;

