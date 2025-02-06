/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [isAuthenticated]);

    if (loading) {
        return <div>Chargement...</div>; // Affiche un écran de chargement au lieu de rediriger immédiatement
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export default ProtectedRoute;
