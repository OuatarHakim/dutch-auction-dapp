import React from 'react';

interface Auction {
    name: string;
    currentPrice: number;
}

interface AuctionItemProps {
    auction: Auction;
}

const AuctionItem: React.FC<AuctionItemProps> = ({ auction }) => {
    return (
        <div className="auction-item">
            <h3>{auction.name}</h3>
            <p>Current Price: {auction.currentPrice}</p>
            <button>Place Bid</button>
        </div>
    );
};

export default AuctionItem;
