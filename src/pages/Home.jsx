import { ArchivePosts } from "../components/Home/ArchivePosts";
import HeaderContent from "../components/Home/HeaderContent";
import { PopularPosts } from "../components/Home/PopularPosts";
import { RecentPosts } from "../components/Home/RecentPosts";
import NewsletterCard from "../components/Other/NewsletterCard";


const Home = () => {
    return (
        <div className="bg-[#071738] pt-[60px]">
            <div className="h-[90vh]">
                <HeaderContent />
            </div>
            <div className="h-[90vh]">
                <RecentPosts />
            </div>
            <div className="h-[90vh]">
                <PopularPosts />
            </div>
            <div className="h-[90vh]">
                <ArchivePosts />
            </div>
            <div className="h-[50vh]">
                <NewsletterCard />
            </div>
        </div>
    );
};

export default Home;
