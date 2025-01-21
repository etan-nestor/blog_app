import vector from '../../assets/Vector.png'
import header from '../../assets/3.png'
import '../../styles/anime.css'


const HeaderContent = () => {
    return (
        <div className="text-center py-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to Tech & Innovation Hub !</h1>
            <div className="w-[453px] h-2 bg-orange-500 mx-auto mb-6"></div>
            <div className="flex justify-center">
                <p className="text-center  w-[600px] text-xl font-semibold text-white mb-6">
                    Explore the latest in technology and innovation. Stay updated with fresh insights, engage with the community, and be inspired by cutting-edge ideas.
                </p>
            </div>
            <div className="absolute top-[12rem] -left-[15rem]">
                <img src={vector} alt="vector" className='w-[400px] h-[414px] cursor-pointer' />
            </div>
            <div className="flex justify-center items-center gap-6">
                <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-200">
                    Get All
                </button>
                <div className="flex justify-center items-center">
                    <img src={header} alt="Tech & Innovation" className="w-[450px] h-[400px] cursor-pointer animate-bounce-moderate" />
                </div>
                <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
                    Posts
                </button>
            </div>
        </div>
    );
};

export default HeaderContent;
