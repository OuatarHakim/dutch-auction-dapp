import React from 'react';
import Dashboard from './components/Dashboead/Dashboard';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <h1>Welcome to Dutch Auction</h1>
            <Dashboard />
        </div>
    );
};

export default HomePage;
