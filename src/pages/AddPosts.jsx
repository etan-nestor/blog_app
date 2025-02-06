import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import apiClient from '../api/apiAxiosConfig';
import { FaPlus } from 'react-icons/fa';

// Validation avec Yup
const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    content: yup.string().required('Content is required'),
    image: yup
        .mixed()
        .required('Image is required')
        .test('fileSize', 'File size is too large', (value) => {
            return value && value[0]?.size <= 100 * 1024 * 1024; // 5MB max
        })
        .test('fileType', 'Unsupported file type', (value) => {
            return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0]?.type);
        }),
});

const CreatePost = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });



    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('content', data.content);
        formData.append('image', data.image[0]);

        toast.promise(
            apiClient.post('/posts/add-post', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            }),
            {
                loading: 'Creating post...',
                success: () => {
                    reset();
                    return 'Post created successfully!';
                },
                error: (err) => `Error: ${err.response?.data?.error || 'Failed to create post.'}`,
            }
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaPlus className="text-blue-500" /> Create a New Post
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            {...register('title')}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter the title"
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            {...register('description')}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter the description"
                        ></textarea>
                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            {...register('content')}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter the content"
                        ></textarea>
                        {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            {...register('image')}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Submit Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
