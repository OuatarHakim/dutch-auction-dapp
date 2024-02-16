
import React, { useState } from 'react';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // État de connexion de l'utilisateur

    // Fonction pour gérer la déconnexion de l'utilisateur
    const handleLogout = () => {
        // Logique de déconnexion
        setIsLoggedIn(false); // Met à jour l'état de connexion de l'utilisateur
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-xl font-bold">Dutch Auction</h1>
            <div className="flex items-center">
                <Link href="/" >
                    <span className="ml-4 text-white hover:text-gray-400">Accueil</span>
                </Link>
                <Link href="/encheres" >
                    <span className="ml-4 text-white hover:text-gray-400">Enchères</span>
                </Link>
                <Link href="/profile">
                    <span className="ml-4 text-white hover:text-gray-400">Profil</span>
                </Link>
                {!isLoggedIn ? (
                    <Link href="/login">
                        <span className="ml-4 text-white hover:text-gray-400 cursor-pointer">Connexion</span>
                    </Link>
                ) : (
                    <LogoutButton onLogout={handleLogout} />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
