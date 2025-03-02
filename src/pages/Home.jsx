import { useState,useEffect } from "react";
import { ArchivePosts } from "../components/Home/ArchivePosts";
import HeaderContent from "../components/Home/HeaderContent";
import { PopularPosts } from "../components/Home/PopularPosts";
import { RecentPosts } from "../components/Home/RecentPosts";
import NewsletterCard from "../components/Other/NewsletterCard";
import LoaderPage from '../components/loader/LoaderPage';



const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 4000);
    }, []);

    return (
        <div className="bg-[#071738] pt-[60px]">
            {loading ? (
                <LoaderPage />  // Affiche le loader pendant 2 secondes
            ) : (
                <>
                    <div className="md:h-[90vh]">
                        <HeaderContent />
                    </div>
                    <div className="md:h-[90vh]">
                        <RecentPosts />
                    </div>
                    <div className="md:h-[90vh]">
                        <PopularPosts />
                    </div>
                    <div className="md:h-[90vh]">
                        <ArchivePosts />
                    </div>
                    <div className="md:h-[50vh]">
                        <NewsletterCard />
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
