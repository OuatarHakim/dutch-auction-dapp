import React from 'react';


const ListEncheresPerdues: React.FC = () => {
    // Exemple de liste d'enchères perdues
    const lostAuctions = [
        { name: 'Item 5', price: 70 },
        { name: 'Item 6', price: 110 },
    ];

    return (
        <div className="lost-auctions-list bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Lost Auctions</h2>
            <ul>
                {lostAuctions.map((auction, index) => (
                    <li key={index} className="flex justify-between items-center border-b py-2">
                        <span>{auction.name}</span>
                        <span>{auction.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListEncheresPerdues;
