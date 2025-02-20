/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FaEdit, FaUserCircle, FaSignOutAlt, FaTrashAlt } from 'react-icons/fa';
import apiClient from '../api/apiAxiosConfig';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        username: '',
        nom: '',
        prenom: '',
        email: '',
        phone: '',
        photo: null,
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    // Charger les données utilisateur
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

                setProfileData(profileRes.data);

            } catch (err) {
                console.error("Erreur API:", err.response ? err.response.data : err.message);
                setError(err.response ? err.response.data : "Erreur lors du chargement des données");

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
        if (file && file.type.startsWith('image/')) {
            setProfileData({ ...profileData, photo: file });
            setPhotoPreview(URL.createObjectURL(file)); // Prévisualisation
        } else {
            alert('Veuillez télécharger une image valide.');
        }
    };

    // Envoyer les modifications à l'API
    // Envoyer les modifications à l'API
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérification des champs obligatoires : ici on ne vérifie plus que tous les champs soient remplis
        if (!profileData.username && !profileData.nom && !profileData.prenom) {
            toast.error('Veuillez remplir au moins un champ');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("Vous devez être connecté !");
                return;
            }

            const updatedData = new FormData();
            if (profileData.username) updatedData.append('username', profileData.username);
            if (profileData.nom) updatedData.append('nom', profileData.nom);
            if (profileData.prenom) updatedData.append('prenom', profileData.prenom);
            if (profileData.phone) updatedData.append('phone', profileData.phone);
            if (profileData.photo) updatedData.append('photo', profileData.photo);

            const response = await apiClient.put('/users/profile-updated', updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Mettre à jour les données dans le localStorage
            const updatedUser = { ...profileData, photo: profileData.photo ? URL.createObjectURL(profileData.photo) : null };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            if (response.data.message) {
                toast.success('Profil mis à jour avec succès !');
            }
        } catch (err) {
            console.error("Erreur lors de la mise à jour du profil", err);
            toast.error(`Erreur lors de la mise à jour du profil : ${err.response ? err.response.data.message : err.message}`);
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
                                        value={profileData.username || ""}
                                        onChange={handleInputChange}
                                        className="border p-2 rounded-md w-full text-gray-800"
                                        placeholder="Nom d'utilisateur"
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="prenom"
                                    value={profileData.prenom || ""}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full text-gray-800"
                                    placeholder="Prénom"
                                />
                                <input
                                    type="text"
                                    name="nom"
                                    value={profileData.nom || ""}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full text-gray-800"
                                    placeholder="Nom"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email || ""}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full font-bold text-orange-600"
                                    placeholder="Email"
                                    readOnly
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profileData.phone || ""}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full text-gray-800"
                                    placeholder="Téléphone"
                                />
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-600">Photo de profil</label>
                                    <input
                                        type="file"
                                        onChange={handlePhotoChange}
                                        className="border p-2 rounded-md"
                                    />
                                </div>
                                <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md">
                                    <FaEdit className="inline mr-2" />
                                    Modifier
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
