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
                setError(err.response ? err.response.data : "Erreur lors du chargement des données");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setProfileData({ ...profileData, photo: file });
            setPhotoPreview(URL.createObjectURL(file));
        } else {
            toast.error('Veuillez télécharger une image valide.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

            if (response.data.message) {
                toast.success('Profil mis à jour avec succès !');
            }
        } catch (err) {
            toast.error(`Erreur lors de la mise à jour du profil : ${err.response ? err.response.data.message : err.message}`);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    if (loading) return <div className="text-center text-white">Chargement...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="bg-[#071738] text-white min-h-screen flex justify-center items-center p-4">
            <div className="w-full max-w-4xl bg-[#0A1F44] p-6 rounded-lg shadow-lg border">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-100">Mon Profil</h1>
                    <div className="flex space-x-3">
                        <button onClick={handleSignOut} className="p-2 rounded-full bg-white text-orange-600 hover:bg-orange-500 hover:text-white">
                            <FaSignOutAlt />
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <input type="text" name="prenom" value={profileData.prenom || ""} onChange={handleInputChange} className="border p-2 rounded-md w-full text-gray-800" placeholder="Prénom" />
                        <input type="text" name="nom" value={profileData.nom || ""} onChange={handleInputChange} className="border p-2 rounded-md w-full text-gray-800" placeholder="Nom" />
                        <input type="email" name="email" value={profileData.email || ""} className="border p-2 rounded-md w-full font-bold text-orange-600" placeholder="Email" readOnly />
                        <input type="tel" name="phone" value={profileData.phone || ""} onChange={handleInputChange} className="border p-2 rounded-md w-full text-gray-800" placeholder="Téléphone" />
                        <div className="flex flex-col">
                            <label className="text-white">Photo de profil</label>
                            <input type="file" onChange={handlePhotoChange} className="border p-2 rounded-md" />
                        </div>
                        <button type="submit" className="mt-4 bg-orange-600 hover:bg-blue-600 text-white py-2 px-6 rounded-md">
                            <FaEdit className="inline mr-2" />Modifier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
