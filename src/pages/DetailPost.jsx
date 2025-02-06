import PostDetail from "../components/Posts/PostDetail";
import postTest from '../assets/Home/home.png'


const postData = {
    image:postTest,
    title:'Test Title',
    description:'Test Description',
    date:'22 janvier',
    likes:12,
    shares:11,
    comments:14,
}

export const DetailPost = () => {
    return (
        <div className="bg-[#071738]">
            <PostDetail
                image={postData.image}
                title={postData.title}
                description={postData.description}
                content={postData.content}
                author={postData.author}
                date={postData.date}
                likes={postData.likes}
                shares={postData.shares}
                comments={postData.comments}
            />
        </div>
    )
}
