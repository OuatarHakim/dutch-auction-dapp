import React from 'react';

const ListEncheresActifs: React.FC = () => {
    // Exemple de liste d'enchères actives
    const activeAuctions = [
        { name: 'Item 3', price: 80 },
        { name: 'Item 4', price: 120 },
    ];

    return (
        <div className="active-auctions-list bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Active Auctions</h2>
            <ul>
                {activeAuctions.map((auction, index) => (
                    <li key={index} className="flex justify-between items-center border-b py-2">
                        <span>{auction.name}</span>
                        <span>{auction.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListEncheresActifs;

