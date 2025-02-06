import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import WelcomeImg from '../../assets/ImgW.png'
import LoaderPage from '../loader/LoaderPage';

const Welcome = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true); // Active le loader
        setTimeout(() => {
            navigate('/signup');  // Redirige vers la page d'inscription après 2 secondes
        }, 4000);
    };
    return (
        <>
            {loading ? (
                <LoaderPage />  // Affiche le loader pendant le délai
            ) : (
                <div className="-mt-[3rem] flex flex-col items-center justify-center h-screen bg-[#071738] text-white">
                    {/* Titre */}
                    <h1 className="text-4xl font-bold mb-2">
                        Bienvenue dans l&#39;univers du savoir et de l&#39;innovation <span className='text-orange-600'>!</span>
                    </h1>

                    {/* Barre sous le titre */}
                    <div className="w-[18rem] h-3 shadow-inner cursor-pointer mt-2 bg-orange-600 mb-6 m-2"></div>

                    {/* Texte descriptif */}
                    <div className="w-[900px]">
                        <p className="text-[20px] text-center mb-4 px-4">
                            Explorez un espace conçu pour vous inspirer, apprendre et grandir. Notre plateforme regroupe des articles, des ressources et des idées sur une variété de domaines, allant de la technologie à la gestion, pour vous aider à rester informé, affiner vos compétences et ouvrir de nouvelles perspectives!
                        </p>
                    </div>

                    {/* Court texte avec emoji */}
                    <p className="text-xl font-bold mb-8">Façonnons l&#39;avenir, un post à la fois. 🚀</p>

                    {/* Icône de flèche animée */}
                    <div className="mb-6 animate-bounce mx-4 py-2 bg-orange-600 rounded-full cursor-pointer">
                        <FiChevronDown className="text-4xl " />
                    </div>

                    {/* Button Get Started */}
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold z-10 hover:bg-orange-600"
                        onClick={handleClick}
                    >
                        Commencer !
                    </button>
                    <div className='-mt-[8rem]'>
                        <img className='cursor-pointer' src={WelcomeImg} alt="Light" />
                    </div>
                </div>
            )}
        </>
    );
};

export default Welcome;
