/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('token');
        return checkTokenValidity(token);
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

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
            return Date.now() < decodedToken.exp * 1000; // Renvoie true si le token est valide
        } catch (error) {
            return false;
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/signin');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleLogout }}>
            {children}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Session Expirée</h2>
                        <p className="mb-4">Votre session a expiré. Veuillez vous reconnecter pour continuer.</p>
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-orange-600 text-white rounded-md"
                        >
                            Se reconnecter
                        </button>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
};
