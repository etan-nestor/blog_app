import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import apiClient from '../../api/apiAxiosConfig';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import './forms.css';
import Logo from '../../assets/Logo.png';

// Validation avec Yup
const schema = yup.object({
    newPassword: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('New Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    };

    const onSubmit = async (data) => {
        const token = localStorage.getItem('token'); // Récupère le token d'authentification depuis le stockage local

        // Vérifiez si un token est disponible avant d'envoyer la requête
        if (!token) {
            toast.error('Token is missing, please login again!');
            return;
        }

        // Envoi de la requête avec le token dans les en-têtes
        toast.promise(
            apiClient.post('/users/reset-password',
                {
                    token,  // Ajout du token dans le corps de la requête
                    newPassword: data.newPassword
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Ajout du token dans l'en-tête Authorization
                    }
                }
            ),
            {
                loading: 'Resetting password...',
                success: (response) => {
                    setTimeout(() => navigate('/signin'), 2000); // Redirection après succès
                    return response.data.message || 'Password reset successfully!';
                },
                error: (err) => {
                    const errorMessage = err.response?.data?.error || 'Reset failed.';
                    return errorMessage;
                },
            }
        );
    };


    return (
        <div className="flex justify-center items-center h-[94vh]">
            <div className="w-[654px] h-[500px] rounded-[18px] shadow-md p-4 bg-[#242F47]">
                <div className="flex flex-col justify-center items-center gap-3 h-[70vh]">
                    {/* Logo */}
                    <div className="flex justify-center items-center mt-2">
                        <img onClick={handleNavigate} className="cursor-pointer w-[120px]" src={Logo} alt="Logo" />
                    </div>

                    {/* Description */}
                    <div className="flex justify-center items-center text-center">
                        <h3 className="w-[400px] text-[18px] font-sembold text-white mb-4">
                            Reset your password by entering and confirming a new one below.
                        </h3>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                        {/* New Password Field */}
                        <div className="relative">
                            <span className="absolute cursor-pointer hover:bg-blue-900 bg-orange-600 w-[55px] h-[40px] rounded-[8px]"></span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="rounded-[8px] w-[366px] h-[40px] pl-[4rem] pr-10"
                                {...register('newPassword')}
                                placeholder="New Password"
                            />
                            <span
                                className="absolute right-3 top-2 cursor-pointer p-1"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                            </span>
                            {errors.newPassword && <p className="text-orange-500">{errors.newPassword.message}</p>}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="relative">
                            <span className="absolute cursor-pointer hover:bg-blue-900 bg-orange-600 w-[55px] h-[40px] rounded-[8px]"></span>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="rounded-[8px] w-[366px] h-[40px] pl-[4rem] pr-10"
                                {...register('confirmPassword')}
                                placeholder="Confirm Password"
                            />
                            <span
                                className="absolute right-3 top-2 cursor-pointer p-1"
                                onClick={() => setShowConfirmPassword(prev => !prev)}
                            >
                                {showConfirmPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                            </span>
                            {errors.confirmPassword && <p className="text-orange-500">{errors.confirmPassword.message}</p>}
                        </div>

                        <div className="flex justify-center items-center mt-2">
                            <button type="submit" className="w-[157px] h-[40px] hover:bg-blue-600 bg-orange-600 text-white p-2 rounded">
                                Reset Password
                            </button>
                        </div>
                    </form>

                    {/* Navigation Links */}
                    <div className="relative left-[10rem] text-white flex flex-col items-end justify-end gap-1 cursor-pointer">
                        <p className='text-gray-500'>Remembered your password?- <span className='text-orange-500 font-semibold underline' onClick={() => navigate('/login')}>Log In</span></p>
                        <p className='text-gray-500'>No account yet?- <span className='text-orange-500 font-semibold underline' onClick={() => navigate('/signup')}>Register here</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
