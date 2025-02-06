import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaRegCommentDots, FaShareAlt, FaSmile, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import toast from 'react-hot-toast';
import LoadData from "../loader/LoadData";
import ErrorDisplay from "../error/ErrorDisplay";
import "../../styles/detailStyle.css";

// import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import apiClient from "../../api/apiAxiosConfig";
import ReactMarkdown from "react-markdown";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false); // Gère l'état du like

    //comments
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [loadingComments, setLoadingComments] = useState(false);
    //emoji picker state
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // État pour gérer le menu de partage
    const [showShareOptions, setShowShareOptions] = useState(false);
    const shareMenuRef = useRef(null);



    // Fonction pour gérer le clic en dehors
    useEffect(() => {
        function handleClickOutside(event) {
            if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
                setShowShareOptions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    // charger comments
    const fetchComments = async () => {
        setLoadingComments(true); // Commencer le chargement
        try {
            const token = localStorage.getItem("token");
            const response = await apiClient.get(`/comments/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComments(response.data);
        } catch (err) {
            console.error("Erreur lors du chargement des commentaires :", err);
        }
        setLoadingComments(false); // Fin du chargement
    };

    // icon button click comment
    const handleToggleComments = () => {
        setShowComments(!showComments);
        if (!showComments) {
            fetchComments();
        }
    };

    //Ajoute comment
    const [loadingAddComment, setLoadingAddComment] = useState(false);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setLoadingAddComment(true);  // Désactiver le bouton

        try {
            const token = localStorage.getItem("token");
            const response = await apiClient.post(
                `/comments/${id}`,
                { content: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201) {
                const newCommentData = response.data.comment;

                // Ajout immédiat du commentaire dans la liste avec le username
                setComments((prevComments) => [...prevComments, newCommentData]);

                // Mise à jour immédiate du compteur de commentaires
                setPost((prevPost) => ({
                    ...prevPost,
                    commentsCount: prevPost.commentsCount + 1,
                }));

                // Ouvre la section des commentaires après l'ajout
                setShowComments(true);
                setNewComment("");
            }
        } catch (err) {
            console.error("Erreur lors de l'ajout du commentaire :", err);
            toast.error("Une erreur s'est produite lors de l'ajout du commentaire.");
        }

        setLoadingAddComment(false);  // Réactiver le bouton
    };

    const handleEmojiSelect = (emoji) => {
        setNewComment(prev => prev + emoji.native); // Ajoute l'emoji au commentaire
        setShowEmojiPicker(false); // Cache le picker après sélection
    };


    // Fonction pour partager avec contenu et image
    const handleShare = async (platform) => {
        const postUrl = `http://localhost:3000/posts/${id}`;
        const shareText = encodeURIComponent(`${title}\n\n${description}`);
        const shareImage = encodeURIComponent(`http://localhost:5000/${image}`);
        let shareUrl = "";

        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}&quote=${shareText}&picture=${shareImage}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}&summary=${shareText}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${postUrl}&text=${shareText}`;
                break;
            default:
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, "_blank");
            setShowShareOptions(false); // Ferme le menu après partage
            setPost((prevPost) => ({
                ...prevPost,
                sharesCount: prevPost.sharesCount + 1,
            }));
            // Mettre à jour le nombre de partages
            try {
                const token = localStorage.getItem("token");
                const response = await apiClient.post(
                    "/shares",
                    { postId: id },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.status === 201) {
                    setPost((prevPost) => ({
                        ...prevPost,
                        sharesCount: prevPost.sharesCount + 1,
                    }));
                }
            } catch (error) {
                console.error("Erreur lors du partage :", error);
            }
        }
    };



    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await apiClient.get(`/posts/post/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTimeout(() => {
                    setPost(response.data);
                    setLiked(response.data.isLikedByUser);
                    setLoading(false);
                }, 4000);
            } catch (err) {
                setError(err.message || "Impossible de récupérer l'article.");
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <LoadData message="Chargement de l'article..." />;
    if (error) return <ErrorDisplay message={error} />;

    const {
        title,
        description,
        image,
        content,
        likesCount,
        commentsCount,
        sharesCount,
        createdAt,
    } = post;

    const formattedDate = new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(createdAt));

    // Fonction pour gérer le like

    const handleLike = async () => {
        try {
            const token = localStorage.getItem('token'); // Récupère le token de l'utilisateur
            // console.log('Token récupéré depuis localStorage:', token); // Vérifie si le token est récupéré

            if (!token) {
                // console.error('Aucun token trouvé. Connectez-vous d\'abord.');
                toast.error('Vous devez être connecté pour liker ce post.');
                return;
            }

            // Si le post n'a pas encore été liké, envoyer une requête POST pour liker
            if (!liked) {
                const response = await apiClient.post(
                    '/likes',
                    { postId: id },
                    { headers: { Authorization: `Bearer ${token}` } } // Inclure le token dans l'en-tête
                );

                if (response.status === 201) {
                    setPost((prevPost) => ({
                        ...prevPost,
                        likesCount: prevPost.likesCount + 1,
                    }));
                    toast.success('Post liké avec succès.');
                } else {
                    toast.error('Impossible de liker ce post.');
                }
            } else {
                // Si le post est déjà liké, envoyer une requête DELETE pour retirer le like
                const response = await apiClient.delete(`/likes/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }, // Inclure le token dans l'en-tête
                });

                if (response.status === 200) {
                    setPost((prevPost) => ({
                        ...prevPost,
                        likesCount: prevPost.likesCount - 1,
                    }));
                    toast.success('Post unliké avec succès.');
                } else {
                    toast.error('Impossible de retirer le like.');
                }
            }
            setLiked(!liked); // Inverser l'état "liké"
        } catch (error) {
            console.error('Erreur lors du traitement du like :', error.message);
            toast.error("Impossible de traiter votre demande. Veuillez réessayer.");
        }
    };



    return (
        <div className="flex justify-center mt-12">
            <div className="bg-[#3f4c69] max-w-[60rem] p-6 rounded-lg shadow-lg">
                {/* Titre */}
                <div className="flex justify-center">
                    <h1 className="w-[700px] text-3xl font-bold text-center text-white mb-4">
                        {title}
                    </h1>
                </div>
                {/* Image */}
                <div className="border border-white rounded-2xl justify-center flex items-center my-2">
                    <img
                        src={`http://localhost:5000/${image}`}
                        alt={title}
                        className="w-[30rem] h-[30rem] cursor-pointer object-scale-down rounded-lg hover:opacity-90 transition-opacity duration-300"
                    />
                </div>

                {/* Auteur et date */}
                <div className="flex justify-center items-center gap-[25rem] text-white mb-6">
                    <span className="italic font-semibold cursor-pointer p-2 bg-orange-600 rounded-tl-lg rounded-br-lg">
                        Nestor COMPAORE
                    </span>
                    <span className="font-semibold cursor-pointer p-2 bg-orange-600 rounded-tr-lg rounded-bl-lg">
                        {formattedDate}
                    </span>
                </div>

                {/* Description */}
                <div className="flex justify-center">
                    <h2 className="w-[700px] text-2xl font-semibold text-center text-white leading-relaxed mb-6">
                        {description}
                    </h2>
                </div>
                {/* Contenu */}
                <div className="flex justify-start items-start">
                    <span className="markdown-content w-[800px] font-semibold text-[12px] text-gray-300">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </span>
                </div>

                {/* Statistiques */}
                <div className="flex justify-around text-gray-300 text-lg mt-6">
                    {/* Like Button */}
                    <div
                        className="flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:text-white"
                        onClick={handleLike}
                    >
                        <AiFillLike className={`text-2xl cursor-pointer transition-transform duration-300 ${liked ? "text-orange-600" : "hover:text-white"}`} />
                        <span>{likesCount} Likes</span>
                    </div>
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:text-white hover:scale-105 transition-transform duration-300"
                        onClick={handleToggleComments}
                    >
                        <FaRegCommentDots className="text-2xl" />
                        <span>{commentsCount} Comments</span>
                    </div>

                    <div className="relative" ref={shareMenuRef}>
                        <div
                            className="flex items-center gap-2 cursor-pointer hover:text-white hover:scale-105 transition-transform duration-300"
                            onClick={() => setShowShareOptions(!showShareOptions)}
                        >
                            <FaShareAlt className="text-2xl" />
                            <span>{sharesCount} Shares</span>
                        </div>

                        {showShareOptions && (
                            <div className="absolute bg-gray-800 w-[15rem] text-white rounded-lg shadow-lg p-2 -top-[7.5rem] -right-[15.5rem]">
                                <button onClick={() => handleShare("facebook")} className="flex gap-2 items-center w-full text-left p-2 hover:bg-gray-700 hover:rounded-lg">
                                    <FaFacebook />
                                    <span>Facebook</span>
                                </button>
                                <button onClick={() => handleShare("linkedin")} className="flex gap-2 items-center w-full text-left p-2 hover:bg-gray-700 hover:rounded-lg">
                                    <FaLinkedin />
                                    <span>LinkedIn</span>
                                </button>
                                <button onClick={() => handleShare("twitter")} className="flex gap-2 items-center w-full text-left p-2 hover:bg-gray-700 hover:rounded-lg">
                                    <FaTwitter />
                                    <span>Twitter</span>
                                </button>
                            </div>
                        )}
                    </div>

                </div>

                {/* Section des commentaires */}
                {showComments && (
                    <div className="bg-gray-800 p-4 rounded-lg mt-4">
                        <h3 className="text-white text-lg mb-2">Commentaires 💭</h3>

                        {loadingComments ? (
                            <p className="text-xl text-white font-semibold">Chargement des commentaires...</p>
                        ) : (
                            comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.id} className="bg-gray-700 p-5 w-[50%] rounded-2xl rounded-bl-none my-2 overflow-hidden">
                                        <div className="flex gap-3 justify-start items-center w-full">
                                            <span className="cursor-pointer text-white font-bold w-10 h-10 px-4 py-2 rounded-full bg-orange-600">
                                                {comment.User ? comment.User.username.charAt(0).toUpperCase() : 'Inconnu'}
                                            </span>
                                            <span className="text-white break-words overflow-hidden w-full">
                                                {comment.content}
                                            </span>
                                        </div>
                                    </div>


                                ))
                            ) : (
                                <p>Aucun commentaire pour linstant.</p>
                            )
                        )}

                        {/* Champ pour ajouter un commentaire */}
                        <form onSubmit={handleAddComment} className="flex mt-4 relative">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Écrire un commentaire..."
                                className="flex-1 p-2 rounded-md bg-gray-700 text-white"
                            />
                            <button
                                type="submit"
                                disabled={loadingAddComment || !newComment.trim()}
                                className={`ml-2 px-4 py-2 rounded-md ${loadingAddComment ? "bg-gray-500" : "bg-orange-600"} text-white`}
                            >
                                {loadingAddComment ? "Envoi..." : "Envoyer"}
                            </button>

                            {/* Bouton d'emoji */}
                            <button
                                type="button"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="ml-2 text-gray-400"
                            >
                                <FaSmile className="text-2xl" />
                            </button>

                            {/* Emoji Picker */}
                            {showEmojiPicker && (
                                <div className="absolute -right-[23.5rem] -top-[23.5rem] z-10">
                                    <Picker onEmojiSelect={handleEmojiSelect} />
                                </div>
                            )}
                        </form>
                    </div>
                )}


            </div>
        </div>
    );
};

export default PostDetail;
