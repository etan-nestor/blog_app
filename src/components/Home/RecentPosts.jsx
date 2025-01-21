import PostCard from "../Other/PostCard"
import post1 from '../../assets/Home/sc1.png'
import post2 from '../../assets/Home/sc2.png'
import post3 from '../../assets/Home/AI.png'
import post4 from '../../assets/Home/sc3.png'




export const RecentPosts = () => {
    return (
        <div className="ml-[3rem] py-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Recent Posts</h1>
            <div className="w-[210px] h-2 bg-orange-500 mb-6"></div>
            <div className="flex justify-start items-start">
                <p className="w-[600px] text-xl font-semibold text-white mb-6">
                    Discover the newest articles and updates on tech and innovation. Stay ahead with the latest insights!
                </p>
            </div>
            <div className="flex justify-start items-center gap-8">
                <PostCard
                    image={post1}
                    title="Revolutionizing Industries with AI: The Future is Here"
                    date="Jan 20, 2025"
                    author="John Doe"
                    comments={120}
                    likes={340}
                    shares={50}
                />
                <PostCard
                    image={post2}
                    title="Revolutionizing Industries with AI: The Future is Here"
                    date="Jan 20, 2025"
                    author="John Doe"
                    comments={120}
                    likes={340}
                    shares={50}
                />
                <PostCard
                    image={post3}
                    title="Revolutionizing Industries with AI: The Future is Here"
                    date="Jan 20, 2025"
                    author="John Doe"
                    comments={120}
                    likes={340}
                    shares={50}
                />
                <PostCard
                    image={post4}
                    title="Revolutionizing Industries with AI: The Future is Here"
                    date="Jan 20, 2025"
                    author="John Doe"
                    comments={120}
                    likes={340}
                    shares={50}
                />
            </div>
        </div>
    )
}
