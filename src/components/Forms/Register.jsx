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
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        toast.promise(
            apiClient.post('/users/register', data),
            {
                loading: 'Registering...',
                success: (response) => {
                    navigate('/signin');
                    return response.data.message || 'Registration successful!';
                },
                error: (err) => {
                    const errorMessage = err.response?.data?.error || 'Registration failed.';
                    return errorMessage;
                },
            }
        );
    };

    return (
        <div className="flex justify-center items-center h-[94vh] px-4">
            <div className="w-full max-w-[654px] h-auto rounded-[18px] shadow-md p-4 bg-[#242F47]">
                <div className="flex flex-col justify-center items-center gap-3 h-auto">
                    {/* Logo */}
                    <div className="flex justify-center items-center mt-2">
                        <img onClick={() => navigate('/')} className="cursor-pointer w-[120px]" src={Logo} alt="Logo" />
                    </div>

                    {/* Description */}
                    <div className="flex justify-center items-center text-center">
                        <h3 className="w-full sm:w-[400px] text-[18px] font-sembold text-white mb-4">
                            Register to create an account and start using our services.
                        </h3>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-3 w-full items-center" onSubmit={handleSubmit(onSubmit)}>
                        {/* Username Field */}
                        <div className="relative w-full sm:w-[450px] lg:w-[500px]">
                            <input
                                type="text"
                                className="rounded-[8px] w-full h-[40px] pl-4 pr-10"
                                {...register('username')}
                                placeholder="Username"
                            />
                            {errors.username && <p className="text-orange-500">{errors.username.message}</p>}
                        </div>

                        {/* Email Field */}
                        <div className="relative w-full sm:w-[450px] lg:w-[500px]">
                            <input
                                type="email"
                                className="rounded-[8px] w-full h-[40px] pl-4 pr-10"
                                {...register('email')}
                                placeholder="Email"
                            />
                            {errors.email && <p className="text-orange-500">{errors.email.message}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="relative w-full sm:w-[450px] lg:w-[500px]">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="rounded-[8px] w-full h-[40px] pl-4 pr-10"
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

                        {/* Confirm Password Field */}
                        <div className="relative w-full sm:w-[450px] lg:w-[500px]">
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
                        <div className="flex justify-center items-center mt-2 w-full sm:w-[157px] lg:w-[200px]">
                            <button type="submit" className="w-full h-[40px] hover:bg-blue-600 bg-orange-600 text-white p-2 rounded">
                                Register
                            </button>
                        </div>
                    </form>

                    {/* Navigation Links */}
                    <div className="w-full flex flex-col items-center sm:items-end gap-1 text-white mt-4">
                        <p className='text-gray-500 text-center sm:text-left'>
                            Already have an account?
                            <span className='text-orange-500 font-semibold underline cursor-pointer' onClick={() => navigate('/signin')}>
                                Log In
                            </span>
                        </p>
                        <p className='text-gray-500 text-center sm:text-left md:underline'>
                            Forgot your password?
                            <span className='text-orange-500 font-semibold underline cursor-pointer' onClick={() => navigate('/reset-password-link')}>
                                Reset here
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>


    );
};

export default Register;
