/* eslint-disable react/prop-types */
import error from '../../assets/Err.png'


const ErrorDisplay = ({ message = "Une erreur s'est produite !" }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Olala !! Une Erreur de connexion Serveur !.</h1>
            <div>
                <img className='w-[250px] cursor-pointer' src={error} alt="error" />
            </div>
            <p className="cursor-pointer text-gray-300 text-xl hover:bg-blue-600 hover:transition-all transition-all font-semibold p-2 mt-5 rounded-tr-lg rounded-bl-lg bg-orange-700 text-center">{message}</p>
        </div>
    );
};

export default ErrorDisplay;
