
import React from 'react';
import ListEncheresGagnantes from './EncheresGagnantes';
import ListEncheresActifs from './EncheresActifs';
import ListEncheresPerdues from './EncheresPerdues';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <>
            <ListEncheresGagnantes />
            <ListEncheresActifs />
            <ListEncheresPerdues />
            </>
        </div>
    );
};

export default Dashboard;