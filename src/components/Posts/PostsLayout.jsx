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

                setPosts(response.data);
                setFilteredPosts(response.data);
            } catch (err) {
                console.error("Erreur lors du chargement des articles :", err);
                setError("Une erreur est survenue lors du chargement des articles.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // 🎯 Fonction pour filtrer les posts
    useEffect(() => {
        let filtered = posts.filter((post) => {
            const postDate = new Date(post.date);

            // Filtrer par titre
            if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // Filtrer par date exacte
            if (selectedDate) {
                const selectedDateFormatted = selectedDate.toISOString().split("T")[0];
                const postDateFormatted = postDate.toISOString().split("T")[0];
                if (postDateFormatted !== selectedDateFormatted) return false;
            }

            // Filtrer par période
            if (filter !== "all") {
                const now = new Date();
                let postDateLimit = new Date();

                switch (filter) {
                    case "this-week":
                        postDateLimit.setDate(now.getDate() - 7);
                        break;
                    case "last-week":
                        postDateLimit.setDate(now.getDate() - 14);
                        break;
                    case "last-month":
                        postDateLimit.setMonth(now.getMonth() - 1);
                        break;
                    default:
                        break;
                }

                if (postDate < postDateLimit) return false;
            }

            return true;
        });

        setFilteredPosts(filtered);
    }, [searchTerm, selectedDate, filter, posts]);

    if (loading) return <LoadData message="Chargement des articles ..." />;
    if (error) return <ErrorDisplay message={error} />;

    return (
        <div>
            {/* Barre de recherche */}
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                filter={filter}
                setFilter={setFilter}
            />

            {/* Liste des posts filtrés */}
            <CardPostList cards={filteredPosts} />
        </div>
    );
};
