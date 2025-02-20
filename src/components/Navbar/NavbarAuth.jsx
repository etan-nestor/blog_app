import { FaFacebook, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { FiMoon, FiSun, FiMenu, FiX, FiBell } from 'react-icons/fi';
import { FaCog } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';

const NavbarAuth = () => {
    const [theme, setTheme] = useState('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [usernameInitial, setUsernameInitial] = useState('');
    const [userPhoto, setUserPhoto] = useState(null);
    const menuRef = useRef(null);


    const navigate = useNavigate();

    // Récupérer le nom d'utilisateur du localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUsernameInitial(user.username.charAt(0).toUpperCase());
            setUserPhoto(user.photo);
        }
    }, []);

    useEffect(() => {
        if (theme === 'system') {
            const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(userPrefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.classList.add(theme);
        }
    }, [theme]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.classList.remove('light', 'dark');
        if (newTheme === 'dark') document.documentElement.classList.add('dark');
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 w-full p-3 bg-[#071738] border-b border-white z-50">
            <div className="flex justify-between items-center px-4">
                {/* Logo */}
                <div className="flex items-center gap-[8rem]">
                    <img
                        onClick={() => navigate('/home')}
                        className="cursor-pointer w-[100px]"
                        src={Logo}
                        alt="Logo"
                    />
                    {/* Menu central */}
                    <div className="hidden md:flex items-center space-x-6">
                        <a onClick={() => navigate('/home')} className="cursor-pointer text-md font-semibold text-white hover:text-gray-400">
                            ACCUEIL
                        </a>
                        <a onClick={() => navigate('/posts')} className="cursor-pointer text-md font-semibold text-white hover:text-gray-400">
                            ARTICLES
                        </a>
                    </div>
                </div>

                {/* Actions à droite */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Médias sociaux */}
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-white hover:text-gray-400 h-5 w-5" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-white hover:text-gray-400 h-5 w-5" />
                    </a>
                    <a href="https://www.discord.com" target="_blank" rel="noopener noreferrer">
                        <FaDiscord className="text-white hover:text-gray-400 h-5 w-5" />
                    </a>
                    {/* Icône de notification */}
                    <button className="text-white hover:text-gray-400">
                        <FiBell className="h-5 w-5" />
                    </button>
                    {/* Icône de profil utilisateur */}
                    <button
                        className="text-white hover:text-gray-400"
                        onClick={() => navigate('/profile')}
                    >
                        <div className="border bg-gray-100 hover:bg-blue-600 w-8 h-8 p-1 rounded-full">
                            {userPhoto ? (
                                <img src={`http://localhost:5000/${userPhoto}`} alt="Profil" className="w-full h-full rounded-full" />
                            ) : (
                                usernameInitial || 'U'
                            )}
                        </div>
                    </button>
                    {/* Bouton thème */}
                    <button
                        className="text-white hover:text-gray-400"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {theme === 'dark' ? <FiMoon className="h-5 w-5" /> : <FiSun className="h-5 w-5" />}
                    </button>
                    {/* Menu dropdown pour le changement de thème */}
                    {isMenuOpen && (
                        <div
                            ref={menuRef}
                            className="absolute right-[1rem] mt-[3rem] w-40 bg-[#071738] border border-white shadow-lg rounded-lg"
                        >
                            <ul className="py-2">
                                <li>
                                    <button
                                        onClick={() => changeTheme('light')}
                                        className="w-full text-left px-4 py-2 text-white hover:bg-orange-600"
                                    >
                                        <FiSun className="inline mr-2" /> CLAIR
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => changeTheme('dark')}
                                        className="w-full text-left px-4 py-2 text-white hover:bg-orange-600"
                                    >
                                        <FiMoon className="inline mr-2" /> SOMBRE
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => changeTheme('system')}
                                        className="w-full text-left px-4 py-2 text-white hover:bg-orange-600"
                                    >
                                        <FaCog className="inline mr-2" /> SYSTÈME
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Hamburger Menu pour Mobile */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white hover:text-gray-400"
                    >
                        {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Menu Mobile */}
            {isMobileMenuOpen && (
                <div className="md:hidden flex flex-col items-center bg-[#071738] py-8 space-y-5">
                    {/* Médias sociaux */}
                    <div className="flex space-x-4 mb-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-white hover:text-gray-400 h-6 w-6" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-white hover:text-gray-400 h-6 w-6" />
                        </a>
                        <a href="https://www.discord.com" target="_blank" rel="noopener noreferrer">
                            <FaDiscord className="text-white hover:text-gray-400 h-6 w-6" />
                        </a>
                    </div>
                    {/* Menu central */}
                    <a href="#home" className="text-lg font-semibold text-white hover:text-gray-400">
                        HOME
                    </a>
                    <a href="#about" className="text-lg font-semibold text-white hover:text-gray-400">
                        ABOUT
                    </a>
                    <a href="#posts" className="text-lg font-semibold text-white hover:text-gray-400">
                        POSTS
                    </a>
                    <a href="#resources" className="text-lg font-semibold text-white hover:text-gray-400">
                        RESOURCES
                    </a>
                </div>
            )}
        </nav>
    );
};

export default NavbarAuth;
