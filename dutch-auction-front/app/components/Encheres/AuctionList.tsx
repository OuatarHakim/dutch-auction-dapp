import React from 'react';
import AuctionItem from './AuctionItem';

interface Auction {
    name: string;
    currentPrice: number;
}

interface AuctionsListProps {
    auctions: Auction[];
}

const AuctionsList: React.FC<AuctionsListProps> = ({ auctions }) => {
    return (
        <div className="auctions-list">
            <h2>All Auctions</h2>
            {auctions.map((auction, index) => (
                <AuctionItem key={index} auction={auction} />
            ))}
        </div>
    );
};

export default AuctionsList;
