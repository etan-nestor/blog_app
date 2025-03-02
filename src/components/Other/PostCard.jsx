/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { FaRegCommentDots, FaRegHeart, FaShareAlt } from "react-icons/fa";

const PostCard = ({
    id,
    image,
    title,
    date,
    author,
    comments,
    likes,
    shares
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
        <div className="bg-[#3f4c69] md:w-[352px] w-[300px] md:h-[390px] h-[348px] rounded-[28px] md:p-4 p-2 shadow-md relative cursor-pointer">
            {/* Image Card */}
            <div className="flex justify-center items-center bg-transparent md:w-[352px] w-[300px] md:h-[234px] rounded-[28px] border md:right-4 md:bottom-4 right-2 bottom-2 border-white shadow-lg relative"
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
                <h3 className=" md:w-[330px] w-[250px] text-center md:text-lg text-[1rem] font-semibold">{title}</h3>

                {/* Date and Author */}
                <div className="flex justify-center items-center gap-8 mb:mt-2 mt-1 md:text-sm text-[0.7rem] font-semibold text-gray-300">
                    <span>{date}</span>
                    <span>{author}</span>
                </div>

                {/* Icons Section */}
                <div className="flex justify-center items-center gap-8 md:mt-4 mt-1 text-sm">

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

export default PostCard;
