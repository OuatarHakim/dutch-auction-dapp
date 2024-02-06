import React from 'react';

const ListEncheresActifs: React.FC = () => {
    // Exemple de liste d'enchères actives
    const activeAuctions = [
        { name: 'Item 3', price: 80 },
        { name: 'Item 4', price: 120 },
    ];

    return (
        <div className="active-auctions-list">
            <h2>Active Auctions</h2>
            <ul>
                {activeAuctions.map((auction, index) => (
                    <li key={index}>{auction.name} - {auction.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListEncheresActifs;
