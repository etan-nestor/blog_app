import { useEffect, useState } from "react";
import apiClient from "../../api/apiAxiosConfig"; // Utilisation du client API configuré
import PostCard from "../Other/PostCard";
import LoadData from "../loader/LoadData";
import HomeError from "../error/HomeError";
import errorP from '../../assets/ErrP.png'


export const PopularPosts = () => {
    const [popularPosts, setPopularPosts] = useState([]); // État pour stocker les posts populaires
    const [loading, setLoading] = useState(true); // État pour indiquer si les données sont en cours de chargement
    const [error, setError] = useState(null); // État pour les erreurs éventuelles

    useEffect(() => {
        const fetchPopularPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await apiClient.get("/posts/popular",{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }); // Appel à l'API des posts populaires
                setPopularPosts(response.data); // Stockage des données récupérées
                setLoading(false); // Fin du chargement
            } catch (err) {
                setError(err.message); // Capture des erreurs
                setLoading(false); // Fin du chargement
            }
        };

        fetchPopularPosts(); // Appel de la fonction lors du montage du composant
    }, []);

    if (loading) return <LoadData message="Chargement des articles recents" />;
    if (error) return <HomeError message="Erreur de recuperation des articles les plus aimes !" image={errorP} />;

    return (
        <div className="mr-[3rem] py-8 text-white">
            <h1 className="text-4xl text-right font-bold mb-4">Articles populaires</h1>
            <div className="flex justify-end items-end">
                <div className="w-[310px] h-2 bg-orange-500 mb-6"></div>
            </div>
            <div className="flex justify-end items-end">
                <p className="w-[600px] text-right text-xl font-semibold text-white mb-6">
                Plongez dans nos articles les plus appréciés et explorez les sujets qui captivent notre communauté.
                </p>
            </div>
            <div className="flex justify-end items-center gap-8">
                {popularPosts.slice(0, 4).map((post) => (
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
