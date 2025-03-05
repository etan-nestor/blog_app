import { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import WelcomeImg from '../../assets/ImgW.png';
import LoaderPage from '../loader/LoaderPage';

const Welcome = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => {
                navigate('/signup');  // Redirection après 4s
            }, 4000);
        }
        return () => clearTimeout(timer);  // Nettoyage du timer
    }, [loading, navigate]);

    return (
        <>
            {loading ? (
                <LoaderPage />
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#071738] text-white px-4">
                    {/* Titre */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center max-w-3xl">
                        Bienvenue dans l&#39;univers du savoir et de l&#39;innovation <span className='text-orange-600'>!</span>
                    </h2>

                    {/* Barre sous le titre */}
                    <div className="w-32 sm:w-48 md:w-72 h-2 bg-orange-600 mb-6"></div>

                    {/* Texte descriptif */}
                    <p className="text-base sm:text-lg md:text-xl text-center leading-relaxed max-w-3xl w-full mb-6">
                        Explorez un espace conçu pour vous inspirer, apprendre et grandir. Notre plateforme regroupe des articles, des ressources et des idées sur une variété de domaines, allant de la technologie à la gestion, pour vous aider à rester informé, affiner vos compétences et ouvrir de nouvelles perspectives !
                    </p>

                    {/* Slogan */}
                    <p className="text-base sm:text-lg md:text-xl font-bold mb-6">Façonnons l&#39;avenir, un post à la fois. 🚀</p>

                    {/* Icône de flèche animée */}
                    <div className="mb-6 animate-bounce bg-orange-600 p-3 rounded-full cursor-pointer">
                        <FiChevronDown className="text-3xl sm:text-4xl md:text-5xl" />
                    </div>

                    {/* Bouton Commencer */}
                    <button
                        className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-lg font-semibold hover:bg-orange-600 transition mb-8"
                        onClick={() => setLoading(true)}
                    >
                        Commencer !
                    </button>

                    {/* Image de bienvenue */}
                    <div className="-mt-[3rem] md:-mt-[10rem] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mb-1">
                        <img className="w-full h-auto cursor-pointer" src={WelcomeImg} alt="Light" />
                    </div>
                </div>
            )}
        </>
    );
};

export default Welcome;
