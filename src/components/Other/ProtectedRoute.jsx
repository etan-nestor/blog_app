/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, setShowModal } = useContext(AuthContext);

    if (!isAuthenticated) {
        setShowModal(true);
        return null;
    }

    return children;
};

export default ProtectedRoute;
