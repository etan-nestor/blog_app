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
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
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

                    // Optionnel : Tu peux également enregistrer l'utilisateur si nécessaire
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
        <div className="flex justify-center items-center h-[94vh]">
            <div className="w-[654px] h-[500px] rounded-[18px] shadow-md p-4 bg-[#242F47]">
                <div className="flex flex-col justify-center items-center gap-3 h-[70vh]">
                    {/* logo */}
                    <div className='flex justify-center items-center mt-2'>
                        <img onClick={handleNavigate} className='cursor-pointer w-[120px]' src={Logo} alt="Logo" />
                    </div>
                    {/* descr */}
                    <div className="flex justify-center items-center text-center">
                        <h3 className="w-[400px] text-center text-[18px] font-sembold text-white mb-4">Connectez-vous pour accéder à votre compte et à du contenu exclusif!</h3>
                    </div>
                    {/* form */}
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Field */}
                        <div className="relative">
                            <span className='absolute cursor-pointer hover:bg-orange-700 bg-blue-600 w-[55px] h-[40px] rounded-[8px]'></span>
                            <input
                                className="rounded-[8px] w-[366px] h-[40px] pl-[4rem]"
                                {...register('email')}
                                placeholder="Email"
                            />
                            {errors.email && <p className="text-orange-500">{errors.email.message}</p>}
                        </div>

                        {/* Password Field with Eye Icon */}
                        <div className="relative">
                            <span className='absolute cursor-pointer hover:bg-blue-900 bg-orange-600 w-[55px] h-[40px] rounded-[8px]'></span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="rounded-[8px] w-[366px] h-[40px] pl-[4rem] pr-10"
                                {...register('password')}
                                placeholder="Password"
                            />
                            <span
                                className="absolute right-3 top-2 cursor-pointer p-1"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                            </span>
                            {errors.password && <p className="text-orange-500">{errors.password.message}</p>}
                        </div>

                        <div className="flex justify-center items-center mt-2">
                            <button type="submit" className="w-[157px] h-[40px] hover:bg-blue-600 bg-orange-600 text-white p-2 rounded">Login</button>
                        </div>
                    </form>
                    <div className="relative left-[10rem] text-white flex flex-col items-end justify-end gap-1 cursor-pointer">
                        <p className='text-gray-500'>No account yet?- <span className='text-orange-500 font-semibold underline' onClick={() => navigate('/signup')}>Register now</span></p>
                        <p className='text-gray-500'>Forgot your password?- <span className='text-orange-500 font-semibold underline' onClick={() => navigate('/reset-password-link')}>Reset it here</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
