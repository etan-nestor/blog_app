/* eslint-disable react/prop-types */
import { FaRegCommentDots, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CardPostMin = ({
    id,
    image,
    title,
    date,
    author,
    comments,
    likes,
    shares,
}) => {
    const navigate = useNavigate();

    const handleImageClick = () => {
        if (!id) {
            console.error("ID du post manquant !");
            return;
        }
        navigate(`/post/${id}`);
    };

    return (
        <div className="bg-[#3f4c69] w-[352px] h-[390px] rounded-[28px] p-4 shadow-md relative cursor-pointer">
            {/* Image Card */}
            <div
                className="flex justify-center items-center bg-transparent w-[352px] h-[234px] rounded-[28px] border right-4 bottom-4 border-white shadow-lg relative"
                onClick={handleImageClick}
                role="button"
                aria-label={`Voir les détails de ${title}`}
            >
                <img
                    src={`http://localhost:5000/${image}`}
                    alt={title}
                    className="w-[230px] h-[230px] object-fit cursor-pointer"
                />
            </div>

            {/* Content Section */}
            <div className="text-white">
                {/* Title */}
                <h3 className="w-[330px] text-center text-lg font-semibold">{title}</h3>

                {/* Date and Author */}
                <div className="flex justify-center items-center gap-8 mt-2 text-sm font-semibold text-gray-300">
                    <span>{date}</span>
                    <span>{author}</span>
                </div>

                {/* Icons Section */}
                <div className="flex justify-center items-center gap-8 mt-4 text-sm">
                    {/* Likes */}
                    <div className="flex items-center gap-2">
                        <FaRegHeart className="text-gray-300 w-5 h-5" />
                        <span>{likes}</span>
                    </div>

                    {/* Comments */}
                    <div className="flex items-center gap-2">
                        <FaRegCommentDots className="text-gray-300 w-5 h-5" />
                        <span>{comments}</span>
                    </div>

                    {/* Shares */}
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
