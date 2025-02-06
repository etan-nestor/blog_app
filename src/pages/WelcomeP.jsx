import { useState, useEffect } from "react";
import Welcome from "../components/Welcome/Welcome";
import LoaderPage from '../components/loader/LoaderPage';


const WelcomeP = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 4000);
    }, []);
    return (
        <div className="h-[100vh] bg-[#071738] pt-[60px]">
            {loading ? (
                <LoaderPage />  // Affiche le loader pendant 2 secondes
            ) : (
                <>
                    <Welcome />
                </>
            )
            }
        </div>
    );
};

export default WelcomeP;
