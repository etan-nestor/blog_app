import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Logo from '../../assets/Logo.png';
import Amico from '../../assets/amico.png';
import './forms.css';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiAxiosConfig';

// Validation avec Yup
const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
});

const SendLink = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleNavigate = () => {
        navigate('/');
    };

    const onSubmit = async (data) => {
        setLoading(true);
        toast.promise(
            apiClient.post('/users/send-reset-link', data),
            {
                loading: 'Sending reset link...',
                success: (response) => {
                    setTimeout(() => navigate('/'), 2000); // Redirection après succès
                    setLoading(false);
                    return response.data.message || 'Reset link sent successfully!';
                },
                error: (err) => {
                    setLoading(false);
                    return err.response?.data?.error || 'Failed to send reset link.';
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
                            Forgot your password? Enter your email address, and we will send you a reset link.
                        </h3>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Field */}
                        <div className="relative w-full sm:w-[450px] mx-auto">
                            <input
                                className="rounded-[8px] w-full h-[40px] pl-[4rem]"
                                {...register('email')}
                                placeholder="Email"
                            />
                            {errors.email && <p className="text-orange-500">{errors.email.message}</p>}
                        </div>

                        {/* Image between the input and the submit button on desktop */}
                        <div className="relative hidden sm:block sm:mt-1">
                            <img src={Amico} alt="Amico" />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center items-center mt-2">
                            <button
                                type="submit"
                                className={`w-full sm:w-[157px] lg:w-[200px] h-[40px] ${loading ? 'bg-gray-400' : 'hover:bg-blue-600 bg-orange-600'
                                    } text-white p-2 rounded`}
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-col items-end gap-1 text-white mt-4 w-full sm:items-end">
                            <p className='text-gray-500 text-center sm:text-right'>
                                Remembered your password? 
                                <span className='text-orange-500 font-semibold underline cursor-pointer' onClick={() => navigate('/signin')}>Log In</span>
                            </p>
                            <p className='text-gray-500 text-center sm:text-right'>
                                No account yet? 
                                <span className='text-orange-500 font-semibold underline cursor-pointer' onClick={() => navigate('/signup')}>Register here</span>
                            </p>
                        </div>
                    </form>

                    {/* Image for mobile */}
                    <div className="relative sm:hidden mt-4">
                        <img src={Amico} alt="Amico" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendLink;
