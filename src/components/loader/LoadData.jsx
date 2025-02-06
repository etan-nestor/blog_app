/* eslint-disable react/prop-types */
import { SyncLoader } from "react-spinners";
import Logo from '../../assets/Logo.png'

const Loader = ({ message = "Chargement..." }) => {
    return (
        <div className="flex flex-col gap-3 items-center justify-center h-screen">
            <img className='w-[100px] cursor-pointer' src={Logo} alt="error" />
            <SyncLoader color="#ffffff" size={15} />
            <p className="mt-4 text-gray-400 font-semibold">{message}</p>
        </div>
    );
};

export default Loader;