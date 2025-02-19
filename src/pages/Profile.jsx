/* eslint-disable no-unused-vars */
import { useState, useEffect} from 'react';
import { FaEdit, FaUserCircle, FaSignOutAlt, FaTrashAlt } from 'react-icons/fa';
import apiClient from '../api/apiAxiosConfig';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        photo: null,
    });

    const navigate = useNavigate()


    const [interactions, setInteractions] = useState({
        likedPosts: [],
        commentedPosts: [],
        sharedPosts: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    // Charger les données utilisateur et interactions
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("Token non trouvé. Veuillez vous connecter.");
                    return;
                }

                const profileRes = await apiClient.get('/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const likedRes = await apiClient.get('/posts/liked', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const commentedRes = await apiClient.get('/posts/commented', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const sharedRes = await apiClient.get('/posts/shared', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProfileData(profileRes.data);
                setInteractions({
                    likedPosts: likedRes.data.likedPosts,
                    commentedPosts: commentedRes.data.commentedPosts,
                    sharedPosts: sharedRes.data.sharedPosts,
                });

            } catch (err) {
                console.error("Erreur API:", err.response ? err.response.data : err.message);
                setError("Erreur lors du chargement des données");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    // Gérer les changements du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    // Gérer l'upload de la photo de profil
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData({ ...profileData, photo: file });
            setPhotoPreview(URL.createObjectURL(file)); // Prévisualisation
        }
    };

    // Envoyer les modifications à l'API
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', profileData.username);
            formData.append('firstName', profileData.firstName);
            formData.append('lastName', profileData.lastName);
            formData.append('email', profileData.email);
            formData.append('phone', profileData.phone);
            if (profileData.photo) {
                formData.append('photo', profileData.photo);
            }

            await apiClient.put('/users/update-profile', formData);
            alert('Profil mis à jour avec succès !');
        } catch (err) {
            alert('Erreur lors de la mise à jour du profil');
        }
    };

    // Déconnexion
    const handleSignOut = () => {
        localStorage.removeItem('token');
        // Rediriger vers la page de connexion
        navigate('/login');
    };
    
    // Suppression du compte
    const handleDeleteAccount = async () => {
        try {
            await apiClient.delete('/users/delete-account');
            console.log("Compte supprimé");
        } catch (err) {
            console.error("Erreur lors de la suppression du compte");
        }
    };

    if (loading) return <div className="text-center text-white">Chargement...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="bg-[#071738] text-white min-h-screen flex justify-center items-center">
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-100">Mon Profil</h1>
                    <div className="flex items-center space-x-4">
                        <button onClick={handleSignOut} className="bg-white hover:bg-orange-500 p-2 rounded-full text-orange-600 hover:text-white">
                            <FaSignOutAlt />
                        </button>
                        <button onClick={handleDeleteAccount} className="bg-red-500 hover:bg-white p-2 rounded-full text-white hover:text-red-800">
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Informations personnelles */}
                    <div className="bg-white p-6 rounded-lg shadow-lg border">
                        <h2 className="text-xl font-semibold mb-4 text-gray-600">Informations personnelles</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    {photoPreview ? (
                                        <img src={photoPreview} alt="Prévisualisation" className="w-16 h-16 rounded-full border" />
                                    ) : (
                                        <FaUserCircle className="text-gray-500 text-5xl" />
                                    )}
                                    <input
                                        type="text"
                                        name="username"
                                        value={profileData.username}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded-md w-full text-gray-700"
                                        placeholder="Nom d'utilisateur"
                                    />
                                </div>
                                <input type="text" name="firstName" value={profileData.firstName} onChange={handleInputChange} className="border p-2 rounded-md w-full" placeholder="Prénom" />
                                <input type="text" name="lastName" value={profileData.lastName} onChange={handleInputChange} className="border p-2 rounded-md w-full" placeholder="Nom" />
                                <input type="email" name="email" value={profileData.email} onChange={handleInputChange} className="border p-2 rounded-md w-full" placeholder="Email" />
                                <input type="tel" name="phone" value={profileData.phone} onChange={handleInputChange} className="border p-2 rounded-md w-full" placeholder="Téléphone" />
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-600">Photo de profil</label>
                                    <input type="file" onChange={handlePhotoChange} className="border p-2 rounded-md" />
                                </div>
                                <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md">
                                    <FaEdit className="inline mr-2" />
                                    Modifier
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Mes interactions */}
                    <div className="bg-white p-6 rounded-lg shadow-lg border">
                        <h2 className="text-xl font-semibold mb-4 text-gray-600">Mes interactions</h2>

                        {/* Posts aimés */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Posts aimés</h3>
                            <ul>{interactions.likedPosts.map((post, index) => <li key={index} className="border-b py-2 text-gray-700">{post.title}</li>)}</ul>
                        </div>

                        {/* Posts commentés */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Posts commentés</h3>
                            <ul>{interactions.commentedPosts.map((post, index) => <li key={index} className="border-b py-2 text-gray-700">{post.title}</li>)}</ul>
                        </div>

                        {/* Posts partagés */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Posts partagés</h3>
                            <ul>{interactions.sharedPosts.map((post, index) => <li key={index} className="border-b py-2 text-gray-700">{post.title}</li>)}</ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
