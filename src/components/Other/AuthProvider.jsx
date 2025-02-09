/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('token');
        return checkTokenValidity(token);
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('token');
            if (!checkTokenValidity(token)) {
                handleLogout();
            }
        }, 5000); // Vérifie toutes les 5 secondes

        return () => clearInterval(interval);
    }, []);

    function checkTokenValidity(token) {
        if (!token) return false;
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            return Date.now() < decodedToken.exp * 1000; // Retourne true si le token est valide
        } catch (error) {
            return false;
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/signin', { replace: true }); // Redirection immédiate
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
