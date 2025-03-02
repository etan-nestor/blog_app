import vector from '../../assets/Vector.png'
import header from '../../assets/Home/blog.jpg'
import { IoNavigateCircle } from "react-icons/io5";
import { IoMdNavigate } from "react-icons/io";
import '../../styles/anime.css';
import { useNavigate } from 'react-router-dom';


const HeaderContent = () => {
    const navigate = useNavigate()
    return (
        <div className="text-center py-8 text-white">
            <h1 className="md:text-4xl text-3xl font-bold mb-4 md:mb-3">Exploration & Savoir !</h1>
            <div className="md:w-[300px] w-[200px] h-2 bg-orange-500 mx-auto mb-6"></div>
            <div className="flex justify-center">
                <p className="text-center  w-[700px] text-xl md:text-[1.5rem] font-semibold text-white mb-6 z-10">
                    Partagez, apprenez et explorez des idées pour enrichir vos connaissances et développer vos compétences.
                </p>
            </div>
            <div className="absolute md:top-[12rem] top-[8rem] -left-[15rem]">
                <img src={vector} alt="vector" className='md:w-[400px] w-[300px] md:h-[414px] h-[314px] cursor-pointer' />
            </div>
            <div className="flex justify-center items-center md:gap-6 gap-3">
                <button onClick={() => navigate('/posts')} className="md:px-6 px-4 md:py-3 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-orange-600 transition duration-200 z-10 ml-2">
                    <IoNavigateCircle size={20} />
                </button>
                <div className="flex justify-center items-center">
                    <img src={header} alt="Tech & Innovation" className="md:w-[650px] w-[550px] h-[180px] md:h-[400px] cursor-pointer animate-bounce-moderate rounded-lg" />
                </div>
                <button onClick={() => navigate('/posts')} className="md:px-6 px-4 md:py-3 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-200 mr-2">
                    <IoMdNavigate size={20} />
                </button>
            </div>
        </div>
    );
};

export default HeaderContent;
