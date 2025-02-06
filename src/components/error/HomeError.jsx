/* eslint-disable react/prop-types */


const HomeError = ({image,message}) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div>
                <img className='w-[100px] cursor-pointer' src={image} alt="error" />
            </div>
            <h1 className="text-xl font-bold text-red-500 mb-4">{message}</h1>
        </div>
    );
};

export default HomeError;
