import { FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import WelcomeImg from '../../assets/ImgW.png'

const Welcome = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/signup');  // Redirige vers la page d'inscription
    };
    return (
        <div className="-mt-[3rem] flex flex-col items-center justify-center h-screen bg-[#071738] text-white">
            {/* Titre */}
            <h1 className="text-4xl font-bold mb-2">
                Welcome to Tech & Innovation Hub <span className='text-orange-600'>!</span>
            </h1>

            {/* Barre sous le titre */}
            <div className="w-[18rem] h-3 shadow-inner cursor-pointer mt-2 bg-orange-600 mb-6 m-2"></div>

            {/* Texte descriptif */}
            <div className="w-[900px]">
                <p className="text-[20px] text-center mb-4 px-4">
                    Stay updated with the latest in technology, explore insightful programming guides, and dive into reviews of cutting-edge gadgets.
                    This blog is your go-to space for discovering innovative IT projects and solutions tailored to inspire and empower tech enthusiasts like you.
                </p>
            </div>

            {/* Court texte avec emoji */}
            <p className="text-xl font-bold mb-8">Let’s shape the future, one post at a time. 🚀</p>

            {/* Icône de flèche animée */}
            <div className="mb-6 animate-bounce mx-4 py-2 bg-orange-600 rounded-full cursor-pointer">
                <FiChevronDown className="text-4xl " />
            </div>

            {/* Button Get Started */}
            <button
                className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold z-10 hover:bg-orange-600"
                onClick={handleClick}
            >
                Get Started
            </button>
            <div className='-mt-[8rem]'>
                <img className='cursor-pointer' src={WelcomeImg} alt="Light" />
            </div>
        </div>
    );
};

export default Welcome;
