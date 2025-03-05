/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { FaRegCommentDots, FaRegHeart, FaShareAlt } from "react-icons/fa";

const PostCard = ({ id, image, title, date, author, comments, likes, shares }) => {
    const navigate = useNavigate();

    const handleImageClick = () => {
        if (!id) {
            console.error("ID du post manquant !");
            return;
        }
        navigate(`/post/${id}`);
    };

    return (
        <div className="bg-[#3f4c69] max-w-xs sm:max-w-sm md:max-w-md rounded-2xl p-4 shadow-md cursor-pointer">
            {/* Image Card */}
            <div
                className="flex justify-center items-center bg-transparent w-full aspect-square rounded-2xl border border-white shadow-lg"
                onClick={handleImageClick}
                role="button"
                aria-label={`Voir les détails de ${title}`}
            >
                <img
                    src={`http://localhost:5000/${image}`}
                    alt={`Illustration du post : ${title}`}
                    className="w-4/5 h-4/5 object-cover rounded-xl"
                />
            </div>

            {/* Content Section */}
            <div className="text-white text-center mt-3">
                {/* Title */}
                <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>

                {/* Date and Author */}
                <div className="flex justify-center items-center gap-4 text-gray-300 text-xs sm:text-sm mt-1">
                    <span>{date}</span>
                    <span>{author}</span>
                </div>

                {/* Icons Section */}
                <div className="flex justify-center items-center gap-6 sm:gap-8 flex-wrap mt-3">
                    {/* Likes */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <FaRegHeart className="text-gray-300 w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">{likes}</span>
                    </div>

                    {/* Comments */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <FaRegCommentDots className="text-gray-300 w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">{comments}</span>
                    </div>

                    {/* Shares */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <FaShareAlt className="text-gray-300 w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">{shares}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
