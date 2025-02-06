import { useEffect, useState } from "react";
import apiClient from "../../api/apiAxiosConfig";
import CardPostList from "./CardPostsList";
import SearchBar from "./SearchBar";
import ErrorDisplay from "../error/ErrorDisplay";
import LoadData from "../loader/LoadData";

export const PostsLayout = () => {
    const [posts, setPosts] = useState([]); // Tous les posts
    const [filteredPosts, setFilteredPosts] = useState([]); // Posts filtrés
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // États pour la recherche et le filtrage
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await apiClient.get("/posts", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTimeout(() => {
                    setPosts(response.data);
                    setFilteredPosts(response.data);
                    setLoading(false);
                }, 4000);
            } catch (err) {
                setError("Une erreur est survenue lors du chargement des articles.", err);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // 🎯 Fonction pour filtrer les posts
    useEffect(() => {
        let filtered = [...posts];

        // Filtrer par titre
        if (searchTerm) {
            filtered = filtered.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filtrer par date exacte
        if (selectedDate) {
            const formattedSelectedDate = selectedDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
            filtered = filtered.filter((post) => {
                const postDate = new Date(post.date);
                const formattedPostDate = postDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
                return formattedPostDate === formattedSelectedDate; // Comparer les dates au même format
            });
        }

        // Filtrer par période (cette semaine, le mois dernier, etc.)
        if (filter !== "all") {
            const now = new Date();
            const postDateLimit = new Date();

            if (filter === "this-week") {
                postDateLimit.setDate(now.getDate() - 7);
            } else if (filter === "last-week") {
                postDateLimit.setDate(now.getDate() - 14);
            } else if (filter === "last-month") {
                postDateLimit.setMonth(now.getMonth() - 1);
            }

            filtered = filtered.filter((post) => new Date(post.date) >= postDateLimit);
        }

        setFilteredPosts(filtered);
    }, [searchTerm, selectedDate, filter, posts]);




    if (loading) return <LoadData message="Chargement des articles ..." />;
    if (error) return <ErrorDisplay message={error} />;

    return (
        <div>
            {/* Barre de recherche */}
            <div className="">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    filter={filter}
                    setFilter={setFilter}
                />
            </div>

            {/* Liste des posts filtrés */}
            <CardPostList cards={filteredPosts} />
        </div>
    );
};
