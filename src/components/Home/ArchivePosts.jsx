import { useEffect, useState } from "react";
import apiClient from "../../api/apiAxiosConfig";
import PostCard from "../Other/PostCard";
import LoadData from "../loader/LoadData";
import HomeError from "../error/HomeError";
import errorA from '../../assets/Err.png'




export const ArchivePosts = () => {
    const [archivePosts, setArchivePosts] = useState([]); // État pour stocker les posts
    const [loading, setLoading] = useState(true); // État pour indiquer si les données sont en cours de chargement
    const [error, setError] = useState(null); // État pour les erreurs éventuelles

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await apiClient.get("/posts/archive", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setArchivePosts(response.data); // Stockage des posts dans l'état
                setLoading(false); // Désactive le chargement
            } catch (err) {
                setError(err.message); // Capture des erreurs
                setLoading(false); // Désactive le chargement
            }
        };

        fetchPosts(); // Appeler l'API lors du montage du composant
    }, []);

    if (loading) return <LoadData message="Chargement des articles recents" />;
    if (error) return <HomeError message="Erreur de recuperation des anciens articles !" image={errorA} />;

    return (
        <div className="mx-[2rem] py-8 text-white">
            <h1 className="text-4xl text-center font-bold mb-4">Anciens articles</h1>
            <div className="flex justify-center items-center ">
                <div className="w-[210px] h-2 bg-orange-500 mb-6"></div>
            </div>
            <div className="flex justify-center items-center">
                <p className="w-[600px] text-center text-xl font-semibold text-white mb-6">
                    Revisitez nos anciens articles et redécouvrez des trésors de connaissances intemporels.
                </p>
            </div>
            <div className="flex justify-center items-center gap-8">
                {archivePosts.slice(0, 4).map((post) => (
                    <PostCard
                        key={post.id}
                        id={post.id}
                        image={post.image}
                        title={post.title.substring(0, 50) + (post.title.length > 50 ? "..." : "")}
                        date={new Intl.DateTimeFormat("fr-FR", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }).format(new Date(post.date))}
                        author="Nestor C."
                        comments={post.commentsCount}
                        likes={post.likesCount}
                        shares={post.sharesCount}
                    />
                ))}
            </div>
        </div>
    )
}
