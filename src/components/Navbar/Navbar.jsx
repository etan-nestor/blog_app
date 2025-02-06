import { FaFacebook, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi'; // Ajout de l'icône de fermeture
import { FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


import Logo from '../../assets/Logo.png';

const Navbar = () => {
   const [theme, setTheme] = useState('light');
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const menuRef = useRef(null);
   const navigate = useNavigate();

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
      <>
         <nav className="fixed top-0 w-full p-2 bg-[#071738] border-b border-white z-50">
            <div className="flex justify-between items-center px-4">
               {/* Logo */}
               <div className="flex items-center">
                  <img onClick={() => navigate('/')} className="cursor-pointer w-[100px]" src={Logo} alt="Logo" />
               </div>

               {/* Menu Desktop */}
               <div className="hidden md:flex items-center space-x-6">
                  <a onClick={() => navigate('/about')} className="cursor-pointer text-md font-semibold text-white hover:text-gray-400">
                     About
                  </a>
                  <button onClick={() => navigate('/signin')} className="px-4 py-1 bg-white text-[#071738] font-semibold rounded hover:bg-orange-600 hover:text-white">
                     Login
                  </button>
                  <button
                     className="text-white hover:text-gray-400"
                     onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                     {theme === 'dark' ? <FiMoon className="h-5 w-5" /> : <FiSun className="h-5 w-5" />}
                  </button>
                  {/* drop down desktop */}
                  {isMenuOpen && (
                     <div
                        ref={menuRef}
                        className="absolute right-[5rem] mt-[12rem] w-35 bg-[#071738] border border-white shadow-lg rounded-lg"
                     >
                        <ul className="py-2">
                           <li>
                              <button
                                 onClick={() => changeTheme('light')}
                                 className="w-full text-left px-4 py-2 text-white hover:bg-orange-600"
                              >
                                 <FiSun className="inline mr-2" /> Clair
                              </button>
                           </li>
                           <li>
                              <button
                                 onClick={() => changeTheme('dark')}
                                 className="w-full text-left px-4 py-2 text-white hover:bg-orange-600"
                              >
                                 <FiMoon className="inline mr-2" /> Sombre
                              </button>
                           </li>
                           <li>
                              <button
                                 onClick={() => changeTheme('system')}
                                 className="w-full text-left px-4 py-2 text-white hover:bg-orange-600"
                              >
                                 <FaCog className="inline mr-2" /> Système
                              </button>
                           </li>
                        </ul>
                     </div>
                  )}
                  <div className="flex space-x-4">
                     <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
                        <FaFacebook className="h-5 w-5" />
                     </a>
                     <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700">
                        <FaLinkedin className="h-5 w-5" />
                     </a>
                     <a href="https://www.discord.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
                        <FaDiscord className="h-5 w-5" />
                     </a>
                  </div>
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
                  <a href="#about" className="text-lg font-semibold text-white hover:text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>
                     About
                  </a>
                  <button
                     className="px-5 py-2 bg-white text-[#071738] font-semibold rounded hover:bg-orange-600 hover:text-white"
                     onClick={() => setIsMobileMenuOpen(false)}
                  >
                     Login
                  </button>
                  <button
                     className="text-white hover:text-gray-400"
                     onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                     {theme === 'dark' ? <FiMoon className="h-5 w-5" /> : <FiSun className="h-5 w-5" />}
                  </button>
                  {/* mobile dropdow */}
                  {isMenuOpen && (
                     <div
                        ref={menuRef}
                        className="absolute right-[8rem] top-[11rem] w-30 bg-[#071738] border border-white shadow-lg rounded-lg"
                     >
                        <ul className="py-1">
                           <li>
                              <button
                                 onClick={() => {
                                    changeTheme('light');
                                    () => setIsMobileMenuOpen(false);
                                 }
                                 }
                                 className="w-full text-left px-3 py-1 text-white hover:bg-orange-600"
                              >
                                 <FiSun className="inline mr-2" /> Clair
                              </button>
                           </li>
                           <li>
                              <button
                                 onClick={() => {
                                    changeTheme('dark');
                                    () => setIsMobileMenuOpen(false);
                                 }}
                                 className="w-full text-left px-3 py-1 text-white hover:bg-orange-600"
                              >
                                 <FiMoon className="inline mr-2" /> Sombre
                              </button>
                           </li>
                           <li>
                              <button
                                 onClick={() => {
                                    changeTheme('system');
                                    () => setIsMobileMenuOpen(false);
                                 }}
                                 className="w-full text-left px-3 py-1 text-white hover:bg-orange-600"
                              >
                                 <FaCog className="inline mr-2" /> Système
                              </button>
                           </li>
                        </ul>
                     </div>
                  )}
               </div>
            )}
         </nav>
      </>
   );
};

export default Navbar;
