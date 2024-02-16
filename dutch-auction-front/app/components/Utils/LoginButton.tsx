import React from 'react';

interface LoginButtonProps {
    onLogin?: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLogin }) => {
    const handleLogin = () => {
        // Logique de connexion
        if (onLogin) {
            onLogin();
        }
    };

    return (
        <button className="ml-4 text-white hover:text-gray-400" onClick={handleLogin}>Login</button>
    );
};

export default LoginButton;

