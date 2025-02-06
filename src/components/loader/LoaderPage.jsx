import { BounceLoader } from 'react-spinners';

const LoaderPage = () => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center h-screen bg-[#071738]">
            <BounceLoader size={60} color="#FF6600" />
        </div>
    );
};

export default LoaderPage;
