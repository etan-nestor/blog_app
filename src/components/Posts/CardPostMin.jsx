/* eslint-disable react/prop-types */
import { FaRegCommentDots, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CardPostMin = ({ id, image, title, date, author, comments, likes, shares }) => {
    const navigate = useNavigate();

    const handleImageClick = () => {
        if (!id) {
            console.error("ID du post manquant !");
            return;
        }
        navigate(`/post/${id}`);
    };

    return (
        <div
            className="bg-[#3f4c69] max-w-sm w-full rounded-2xl p-4 shadow-md cursor-pointer"
            role="button"
            tabIndex="0"
            onClick={handleImageClick}
        >
            {/* Image Card */}
            <div className="flex justify-center items-center bg-transparent w-full h-56 rounded-2xl border border-white shadow-lg overflow-hidden">
                <img
                    src={`http://localhost:5000/${image}`}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "/placeholder.jpg"; }} // Image par défaut si erreur
                />
            </div>

            {/* Content Section */}
            <div className="text-white text-center mt-4">
                {/* Title */}
                <h3 className="text-lg font-semibold truncate px-2">{title}</h3>

                {/* Date and Author */}
                <div className="flex justify-center items-center gap-4 mt-2 text-sm font-semibold text-gray-300">
                    <span>{date}</span>
                    <span className="truncate">{author}</span>
                </div>

                {/* Icons Section */}
                <div className="flex justify-center items-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <FaRegHeart className="text-gray-300 w-5 h-5" />
                        <span>{likes}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaRegCommentDots className="text-gray-300 w-5 h-5" />
                        <span>{comments}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaShareAlt className="text-gray-300 w-5 h-5" />
                        <span>{shares}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPostMin;
