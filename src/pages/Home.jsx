import { useState, useEffect } from "react";
import { ArchivePosts } from "../components/Home/ArchivePosts";
import HeaderContent from "../components/Home/HeaderContent";
import { PopularPosts } from "../components/Home/PopularPosts";
import { RecentPosts } from "../components/Home/RecentPosts";
import NewsletterCard from "../components/Other/NewsletterCard";
import LoaderPage from '../components/loader/LoaderPage';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Temps de chargement optimisé à 3s

        return () => clearTimeout(timer); // Nettoyage du timer au démontage
    }, []);

    return (
        <div className="bg-[#071738] min-h-screen pt-[60px]" aria-live="polite">
            {loading ? (
                <LoaderPage />  // Affichage du loader pendant 3 secondes
            ) : (
                <>
                    <section className="min-h-screen flex justify-center items-center">
                        <HeaderContent />
                    </section>
                    <section className="min-h-screen flex justify-center items-center">
                        <RecentPosts />
                    </section>
                    <section className="min-h-screen flex justify-center items-center">
                        <PopularPosts />
                    </section>
                    <section className="min-h-screen flex justify-center items-center">
                        <ArchivePosts />
                    </section>
                    <section className="min-h-[50vh] flex justify-center items-center">
                        <NewsletterCard />
                    </section>
                </>
            )}
        </div>
    );
};

export default Home;
