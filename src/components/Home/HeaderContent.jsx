import { useNavigate } from "react-router-dom";
import { IoNavigateCircle } from "react-icons/io5";
import { IoMdNavigate } from "react-icons/io";
import vector from "../../assets/Vector.png";
import header from "../../assets/Home/blog.jpg";
import "../../styles/anime.css";

const HeaderContent = () => {
    const navigate = useNavigate();

    return (
        <section className="relative flex flex-col items-center text-center py-12 text-white">
            {/* Titre et Sous-titre */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Exploration & Savoir !</h2>
                <div className="w-24 h-2 bg-orange-500 mx-auto mb-6"></div>
                <p className="text-lg md:text-xl font-medium w-full max-w-[700px] mx-auto">
                    Partagez, apprenez et explorez des idées pour enrichir vos connaissances et développer vos compétences.
                </p>
            </div>

            {/* Image vectorielle décorative a revoir*/}
            <div className="fixed -top-[60px] -left-[5rem] md:-top-[20%] md:-left-[10%] -z-10">
                <img src={vector} alt="Décoration" className="w-64 md:w-80" />
            </div>
            
            {/* Contenu principal centré */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
                <button
                    onClick={() => navigate('/posts')}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-orange-600 transition duration-300"
                    aria-label="Explorer les posts"
                >
                    <IoNavigateCircle size={24} />
                </button>

                <img
                    src={header}
                    alt="Tech & Innovation"
                    className="w-72 md:w-[550px] h-auto rounded-lg shadow-lg animate-bounce-moderate"
                />

                <button
                    onClick={() => navigate('/posts')}
                    className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300"
                    aria-label="Naviguer vers les articles"
                >
                    <IoMdNavigate size={24} />
                </button>
            </div>
        </section>
    );
};

export default HeaderContent;
