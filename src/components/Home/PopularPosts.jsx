import { useEffect, useState } from "react";
import apiClient from "../../api/apiAxiosConfig";
import PostCard from "../Other/PostCard";
import LoadData from "../loader/LoadData";
import HomeError from "../error/HomeError";
import errorP from '../../assets/ErrP.png';

export const PopularPosts = () => {
    const [popularPosts, setPopularPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await apiClient.get("/posts/popular", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPopularPosts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPopularPosts();
    }, []);

    if (loading) return <LoadData message="Chargement des articles populaires..." aria-live="polite" />;
    if (error) return <HomeError message="Erreur de récupération des articles populaires !" image={errorP} />;

    return (
        <section className="text-white px-4 md:px-12 py-8">
            {/* Titre */}
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-4xl font-bold">Articles populaires</h2>
                <div className="w-24 h-2 bg-orange-500 mx-auto mt-2 mb-4 md:mb-6"></div>
                <p className="text-sm md:text-lg font-medium">
                    Découvrez les articles les plus appréciés par notre communauté et explorez les sujets tendances.
                </p>
            </div>

            {/* Liste des articles */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
                {popularPosts.slice(0, 4).map((post) => (
                    <PostCard
                        key={post.id}
                        id={post.id}
                        image={post.image}
                        title={post.title.length > 50 ? `${post.title.substring(0, 50)}...` : post.title}
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
        </section>
    );
};
