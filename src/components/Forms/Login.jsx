import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import apiClient from '../../api/apiAxiosConfig'; // Assurez-vous que apiClient gère l'authentification via le token
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import './forms.css';
import Logo from '../../assets/Logo.png';

// Validation avec Yup
const schema = yup.object({
    email: yup.string().email('Email invalide').required('L\'email est requis'),
    password: yup.string().min(6, 'Le mot de passe doit comporter au moins 6 caractères').required('Le mot de passe est requis'),
});

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    };

    const onSubmit = async (data) => {
        toast.promise(
            apiClient.post('/users/login', data),  // Envoie la requête de connexion
            {
                loading: 'Connexion en cours...',
                success: (response) => {
                    const { token, user } = response.data;

                    // Enregistrer le token dans le localStorage
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));

                    setTimeout(() => navigate('/home'), 2000); // Redirection après succès
                    return response.data.message || 'Connexion réussie!';
                },
                error: (err) => {
                    const errorMessage = err.response?.data?.error || 'Connexion échouée.';
                    return errorMessage.includes('not found')
                        ? '🚫 Compte introuvable. Veuillez vous inscrire.'
                        : errorMessage.includes('Invalid Credentials')
                            ? '⚠️ Mot de passe incorrect. Réessayez!'
                            : errorMessage;
                },
            }
        );
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-[#071738]">
            <div className="w-full max-w-md h-auto rounded-[18px] shadow-md p-6 bg-[#242F47]">
                <div className="flex flex-col justify-center items-center gap-3">
                    {/* Logo */}
                    <div className='flex justify-center items-center mt-2'>
                        <img
                            onClick={handleNavigate}
                            className='cursor-pointer w-[120px] sm:w-[150px]'
                            src={Logo}
                            alt="Logo de l'application"
                        />
                    </div>
                    {/* Description */}
                    <div className="flex justify-center items-center text-center">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                            Connectez-vous pour accéder à votre compte et à du contenu exclusif !
                        </h3>
                    </div>
                    {/* Formulaire */}
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Field */}
                        <div className="relative">
                            <input
                                className="rounded-[8px] w-full h-[40px] pl-4"
                                {...register('email')}
                                placeholder="Email"
                                aria-label="Email"
                            />
                            {errors.email && <p className="text-orange-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Password Field with Eye Icon */}
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="rounded-[8px] w-full h-[40px] pl-4 pr-10"
                                {...register('password')}
                                placeholder="Mot de passe"
                                aria-label="Mot de passe"
                            />
                            <span
                                className="absolute right-3 top-2 cursor-pointer p-1"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                            </span>
                            {errors.password && <p className="text-orange-500 text-sm">{errors.password.message}</p>}
                        </div>

                        <div className="flex justify-center items-center mt-4">
                            <button type="submit" className="w-full sm:w-[157px] h-[40px] hover:bg-blue-600 bg-orange-600 text-white p-2 rounded-md">
                                Se connecter
                            </button>
                        </div>
                    </form>

                    {/* Additional Links */}
                    <div className="text-center text-white mt-4">
                        <p className='text-gray-500'>
                            Pas de compte ?{' '}
                            <span
                                className='text-orange-500 font-semibold underline cursor-pointer'
                                onClick={() => navigate('/signup')}
                            >
                                Inscrivez-vous
                            </span>
                        </p>
                        <p className='text-gray-500'>
                            Mot de passe oublié ?{' '}
                            <span
                                className='text-orange-500 font-semibold underline cursor-pointer'
                                onClick={() => navigate('/reset-password-link')}
                            >
                                Réinitialisez-le ici
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
