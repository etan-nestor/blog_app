/* eslint-disable react/prop-types */
import error from '../../assets/Err.png';

const ErrorDisplay = ({ message = "Une erreur s'est produite !" }) => {
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-[#071738] text-white">
            <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mb-4 text-center">
                Olala !! Une Erreur de connexion Serveur !
            </h1>
            <div>
                <img
                    className='w-[200px] sm:w-[250px] cursor-pointer mx-auto'
                    src={error}
                    alt="Image d'erreur, connexion serveur échouée"
                />
            </div>
            <p className="cursor-pointer text-gray-300 text-xl sm:text-2xl hover:bg-blue-600 hover:transition-all transition-all font-semibold p-4 mt-5 rounded-lg bg-orange-700 text-center">
                {message}
            </p>
        </main>
    );
};

export default ErrorDisplay;
