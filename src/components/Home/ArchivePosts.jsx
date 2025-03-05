import { useEffect, useState } from "react";
import apiClient from "../../api/apiAxiosConfig";
import PostCard from "../Other/PostCard";
import LoadData from "../loader/LoadData";
import HomeError from "../error/HomeError";
import errorA from '../../assets/Err.png';

export const ArchivePosts = () => {
    const [archivePosts, setArchivePosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await apiClient.get("/posts/archive", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setArchivePosts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <LoadData message="Chargement des anciens articles..." aria-live="polite" />;
    if (error) return <HomeError message="Erreur lors de la récupération des anciens articles !" image={errorA} />;

    return (
        <section className="text-white px-4 md:px-12 py-8">
            {/* Titre */}
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-4xl font-bold">Anciens articles</h2>
                <div className="w-24 h-2 bg-orange-500 mx-auto mt-2 mb-4 md:mb-6"></div>
                <p className="text-sm md:text-lg font-medium">
                    Plongez dans nos archives et redécouvrez des trésors de connaissances intemporels.
                </p>
            </div>

            {/* Liste des articles */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
                {archivePosts.slice(0, 4).map((post) => (
                    <PostCard
                        key={post.id}
                        id={post.id}
                        image={post.image}
                        title={post.title.length > 50 ? `${post.title.substring(0, 50)}...` : post.title}
                        date={new Intl.DateTimeFormat("fr-FR", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }).format(new Date(post.date))}
                        author="Nestor C."
                        comments={post.commentsCount || 0}
                        likes={post.likesCount || 0}
                        shares={post.sharesCount || 0}
                    />
                ))}
            </div>
        </section>
    );
};
