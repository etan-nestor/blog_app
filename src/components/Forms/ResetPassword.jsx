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

// Validation schema avec Yup
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

    const handleNavigate = () => navigate('/');

    const onSubmit = async (data) => {
        const token = localStorage.getItem('token'); // Récupérer le token

        if (!token) {
            toast.error('Token is missing, please login again!');
            return;
        }

        // Envoi de la requête pour réinitialiser le mot de passe
        toast.promise(
            apiClient.post('/users/reset-password', 
                { token, newPassword: data.newPassword }, 
                { headers: { 'Authorization': `Bearer ${token}` } }
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
        <div className="flex justify-center items-center h-[94vh] px-4">
            <div className="w-full max-w-[654px] h-auto rounded-[18px] shadow-md p-4 bg-[#242F47]">
                <div className="flex flex-col justify-center items-center gap-3">
                    {/* Logo */}
                    <div className="flex justify-center items-center mt-2">
                        <img onClick={handleNavigate} className="cursor-pointer w-[120px]" src={Logo} alt="Logo" />
                    </div>

                    {/* Description */}
                    <div className="flex justify-center items-center text-center">
                        <h3 className="w-[90%] sm:w-[400px] text-[18px] font-semibold text-white mb-4">
                            Reset your password by entering and confirming a new one below.
                        </h3>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit(onSubmit)}>
                        {/* New Password Field */}
                        <div className="relative w-full sm:w-[450px] lg:w-[500px] mx-auto">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="rounded-[8px] w-full h-[40px] pl-4 pr-10"
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
                        <div className="relative w-full sm:w-[450px] lg:w-[500px] mx-auto">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="rounded-[8px] w-full h-[40px] pl-4 pr-10"
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

                        {/* Submit Button */}
                        <div className="flex justify-center items-center mt-2">
                            <button type="submit" className="w-full sm:w-[157px] lg:w-[200px] h-[40px] hover:bg-blue-600 bg-orange-600 text-white p-2 rounded">
                                Reset Password
                            </button>
                        </div>
                    </form>

                    {/* Navigation Links */}
                    <div className="flex flex-col items-end gap-1 text-white mt-4 w-full">
                        <p className='text-gray-500 text-center sm:text-right'>
                            Remembered your password? 
                            <span className='text-orange-500 font-semibold underline cursor-pointer' onClick={() => navigate('/login')}>Log In</span>
                        </p>
                        <p className='text-gray-500 text-center sm:text-right'>
                            No account yet? 
                            <span className='text-orange-500 font-semibold underline cursor-pointer' onClick={() => navigate('/signup')}>Register here</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
