
import React from 'react';

const ListEcheresGagnantes: React.FC = () => {
    // Exemple de liste d'enchères remportées
    const winningAuctions = [
        { name: 'Item 1', price: 100 },
        { name: 'Item 2', price: 150 },
    ];

    return (
        <div className="winning-auctions-list">
            <h2>Winning Auctions</h2>
            <ul>
                {winningAuctions.map((auction, index) => (
                    <li key={index}>{auction.name} - {auction.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListEcheresGagnantes;
