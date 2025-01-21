/* eslint-disable no-unused-vars */
import React from 'react'
import PostsLayout from '../components/Posts/PostsLayout';

const mockPosts = [
    { id: 1, title: "Post Today", date: new Date(), author: "Alice", comments: 5, likes: 10, shares: 2 },
    { id: 2, title: "Post Last Week", date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), author: "Bob", comments: 3, likes: 8, shares: 1 },
    { id: 3, title: "Post Last Month", date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), author: "Charlie", comments: 7, likes: 15, shares: 5 },
];

export const PostsPage = () => {
    return (
        <div>
            <PostsLayout posts={mockPosts} />
        </div>
    )
}
