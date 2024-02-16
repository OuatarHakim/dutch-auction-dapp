import React, { useState } from 'react';

interface BidFormProps {
    onSubmit: (bidAmount: number) => void;
}

const BidForm: React.FC<BidFormProps> = ({ onSubmit }) => {
    const [bidAmount, setBidAmount] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(parseFloat(bidAmount));
        setBidAmount('');
    };

    return (
        <div className="bid-form">
            <h2>Place Bid</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} placeholder="Bid Amount (ETH)" />
                <button type="submit">Place Bid</button>
            </form>
        </div>
    );
};

export default BidForm;
