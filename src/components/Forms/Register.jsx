import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import apiClient from '../../api/apiAxiosConfig';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import './forms.css';

import Logo from '../../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

// Validation avec Yup
const schema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
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
                loading: 'Saving...',
                success: (response) => {
                    // Affiche un toast succès et redirige après un délai
                    setTimeout(() => navigate('/signin'), 2000);
                    return response.data.message || 'Settings saved!';
                },
                error: (err) => {
                    const errorMessage = err.response?.data?.error || 'Could not save.';
                    return errorMessage.includes('exist')
                        ? '🚫 Vous avez déjà un compte. Connectez-vous !'
                        : errorMessage;
                },
            }
        );
    };

    return (
        <div className="flex justify-center items-center h-[94vh]">
            <div className="w-[654px] h-[561px] rounded-[18px] shadow-md p-4 bg-[#242F47]">
                <div className="flex flex-col justify-center items-center gap-3 h-[70vh]">
                    {/* logo */}
                    <div className='flex justify-center items-center mt-2'>
                        <img onClick={() => navigate('/')} className='cursor-pointer w-[120px]' src={Logo} alt="Logo" />
                    </div>
                    {/* descr */}
                    <div className="flex justify-center items-center text-center">
                        <h3 className="w-[400px] text-center text-[18px] font-sembold text-white mb-4">Create your account now and unlock access to exclusive content, updates, and more!</h3>
                    </div>
                    {/* form */}
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative">
                            <span className='absolute cursor-pointer hover:bg-blue-900 bg-orange-600 w-[55px] h-[40px] rounded-[8px]'></span>
                            <input
                                className="rounded-[8px] w-[366px] h-[40px] pl-[4rem]"
                                {...register('username')}
                                placeholder="Username"
                            />
                            {errors.username && <p className="text-orange-500">{errors.username.message}</p>}
                        </div>

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

                        {/* Confirm Password Field with Eye Icon */}
                        <div className="relative">
                            <span className='absolute cursor-pointer hover:bg-orange-700 bg-blue-600 w-[55px] h-[40px] rounded-[8px]'></span>
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
                            <button type="submit" className="w-[157px] h-[40px] hover:bg-blue-600 bg-orange-600 text-white p-2 rounded">Register</button>
                        </div>
                    </form>
                    <div className="relative left-[11rem] text-white flex items-end justify-end gap-1 cursor-pointer">
                        <p className='text-gray-500'>Already have an account?</p>
                        <span className='text-orange-500 font-semibold underline' onClick={()=>navigate('/signin')}>Log In</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
