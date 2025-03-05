/* eslint-disable react/prop-types */

const HomeError = ({ image, message }) => {
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-[#071738] text-white">
            <div>
                <img
                    className="w-[80px] sm:w-[100px] cursor-pointer mx-auto"
                    src={image}
                    alt="Image d'erreur, veuillez réessayer plus tard"
                />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 text-center">
                {message}
            </h1>
        </main>
    );
};

export default HomeError;
