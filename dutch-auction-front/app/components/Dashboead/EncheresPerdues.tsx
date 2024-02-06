import React from 'react';

const ListEncheresPerdues: React.FC = () => {
    // Exemple de liste d'enchères perdues
    const lostAuctions = [
        { name: 'Item 5', price: 70 },
        { name: 'Item 6', price: 110 },
    ];

    return (
        <div className="lost-auctions-list">
            <h2>Lost Auctions</h2>
            <ul>
                {lostAuctions.map((auction, index) => (
                    <li key={index}>{auction.name} - {auction.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListEncheresPerdues;
