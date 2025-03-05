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
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center max-w-2xl">
                        Bienvenue dans l&#39;univers du savoir et de l&#39;innovation <span className='text-orange-600'>!</span>
                    </h1>

                    {/* Barre sous le titre */}
                    <div className="w-40 md:w-72 h-2 bg-orange-600 mb-6"></div>

                    {/* Texte descriptif */}
                    <p className="text-lg md:text-xl text-center leading-relaxed max-w-3xl w-full mb-6">
                        Explorez un espace conçu pour vous inspirer, apprendre et grandir. Notre plateforme regroupe des articles, des ressources et des idées sur une variété de domaines, allant de la technologie à la gestion, pour vous aider à rester informé, affiner vos compétences et ouvrir de nouvelles perspectives !
                    </p>

                    {/* Slogan */}
                    <p className="text-lg md:text-xl font-bold mb-6">Façonnons l&#39;avenir, un post à la fois. 🚀</p>

                    {/* Icône de flèche animée */}
                    <div className="mb-6 animate-bounce bg-orange-600 p-3 rounded-full cursor-pointer">
                        <FiChevronDown className="text-3xl md:text-4xl" />
                    </div>

                    {/* Bouton Commencer */}
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-orange-600 transition"
                        onClick={() => setLoading(true)}
                    >
                        Commencer !
                    </button>

                    {/* Image de bienvenue */}
                    <div className="mt-8 max-w-xs md:max-w-md lg:max-w-lg">
                        <img className="w-full h-auto cursor-pointer" src={WelcomeImg} alt="Light" />
                    </div>
                </div>
            )}
        </>
    );
};

export default Welcome;
