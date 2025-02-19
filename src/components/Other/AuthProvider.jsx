/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('token');
        return checkTokenValidity(token);
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!checkTokenValidity(token)) {
            setShowModal(true);
            setIsAuthenticated(false);
        } else {
            setShowModal(false);
            setIsAuthenticated(true);
        }
    }, [location.pathname]); // Vérifier à chaque changement de page

    function checkTokenValidity(token) {
        if (!token) return false;
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            return Date.now() < decodedToken.exp * 1000;
        } catch (error) {
            return false;
        }
    }

    const handleSignInClick = () => {
        setShowModal(false);
        navigate('/signin', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setShowModal, setIsAuthenticated }}>
            {children}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
                    <div className="bg-[#1e2a38] p-10 rounded-lg text-center w-full max-w-sm">
                        <h2 className="text-2xl font-semibold text-white mb-5">Session expirée</h2>
                        <p className="text-lg text-white mb-6">Vous devez vous connecter pour continuer.</p>
                        <button
                            onClick={handleSignInClick}
                            className="bg-orange-600 text-[#071738] py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-400 transition duration-300">
                            Se connecter
                        </button>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
};
