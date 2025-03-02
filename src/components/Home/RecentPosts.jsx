import { useEffect, useState } from "react";
import apiClient from "../../api/apiAxiosConfig";
import PostCard from "../Other/PostCard";
import LoadData from "../loader/LoadData";
import HomeError from "../error/HomeError";
import errorR from '../../assets/ErrR.png'


export const RecentPosts = () => {

    const [recentPosts, setRecentPosts] = useState([]); // État pour stocker les posts
    const [loading, setLoading] = useState(true); // État pour indiquer si les données sont en cours de chargement
    const [error, setError] = useState(null); // État pour les erreurs éventuelles

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await apiClient.get('/posts/recents', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTimeout(() => {
                    setRecentPosts(response.data); // Stockage des posts dans l'état
                    setLoading(false);
                }, 400);
                // Désactive le chargement
            } catch (err) {
                setError(err.message); // Capture des erreurs
                setLoading(false); // Désactive le chargement
            }
        };

        fetchPosts(); // Appeler l'API lors du montage du composant
    }, []);

    if (loading) return <LoadData message="Chargement des articles recents" />;
    if (error) return <HomeError message="Erreur de recuperation des articles Recents !" image={errorR} />;
    return (
        <div className="md:ml-[3rem] md:py-8 text-white mx-[2rem] py-8">
            <h1 className="md:text-4xl text-2xl font-bold md:mb-4 mb-2">Articles récents</h1>
            <div className="md:w-[260px] w-[180px] h-2 bg-orange-500 md:mb-6 mb-4"></div>
            <div className="flex justify-start items-start">
                <p className="w-[600px] md:text-xl text-[1rem] font-semibold text-white mb-6">
                Découvrez les derniers articles et mises à jour sur la tech l&#39;innovation et beaucoup d&#39;autres. Restez à jour avec les meilleures idées !
                </p>
            </div>

            <div className="md:flex md:justify-start md:items-center md:gap-8 justify-center items-center gap-8">
                {recentPosts.slice(0, 4).map((post) => (
                    <PostCard
                        key={post.id}
                        id={post.id}
                        image={post.image}
                        title={post.title.substring(0, 50) + (post.title.length > 50 ? "..." : "")}
                        date={new Intl.DateTimeFormat("fr-FR", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }).format(new Date(post.createdAt))}
                        author="Nestor C."
                        comments={post.Comments ? post.Comments.length : 0}
                        likes={post.Likes ? post.Likes.length : 0}
                        shares={post.Shares ? post.Shares.length : 0}
                    />
                ))}
            </div>
        </div>
    );
};
