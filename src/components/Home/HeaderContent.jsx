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
            <h1 className="text-4xl font-bold mb-4">Exploration & Savoir !</h1>
            <div className="w-[300px] h-2 bg-orange-500 mx-auto mb-6"></div>
            <div className="flex justify-center">
                <p className="text-center  w-[700px] text-[1.5rem] font-semibold text-white mb-6">
                    Partagez, apprenez et explorez des idées pour enrichir vos connaissances et développer vos compétences.
                </p>
            </div>
            <div className="absolute top-[12rem] -left-[15rem]">
                <img src={vector} alt="vector" className='w-[400px] h-[414px] cursor-pointer' />
            </div>
            <div className="flex justify-center items-center gap-6">
                <button onClick={() => navigate('/posts')} className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-orange-600 transition duration-200">
                    <IoNavigateCircle size={30} />
                </button>
                <div className="flex justify-center items-center">
                    <img src={header} alt="Tech & Innovation" className="w-[650px] h-[400px] cursor-pointer animate-bounce-moderate rounded-lg" />
                </div>
                <button onClick={() => navigate('/posts')} className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-200">
                    <IoMdNavigate size={25} />
                </button>
            </div>
        </div>
    );
};

export default HeaderContent;
