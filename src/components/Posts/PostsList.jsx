/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import PostCard from "../Other/PostCard"; // Utilise le composant PostCard

const PostsList = ({ posts }) => {
    // Regrouper les posts par date
    const groupedPosts = {
        today: posts.filter((post) => isToday(post.date)),
        lastWeek: posts.filter((post) => isLastWeek(post.date)),
        lastMonth: posts.filter((post) => isLastMonth(post.date)),
        older: posts.filter(
            (post) =>
                !isToday(post.date) && !isLastWeek(post.date) && !isLastMonth(post.date)
        ),
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Today */}
            {groupedPosts.today.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Today</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedPosts.today.map((post) => (
                            <PostCard key={post.id} {...post} />
                        ))}
                    </div>
                </div>
            )}

            {/* Last Week */}
            {groupedPosts.lastWeek.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Last Week</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedPosts.lastWeek.map((post) => (
                            <PostCard key={post.id} {...post} />
                        ))}
                    </div>
                </div>
            )}

            {/* Last Month */}
            {groupedPosts.lastMonth.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Last Month</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedPosts.lastMonth.map((post) => (
                            <PostCard key={post.id} {...post} />
                        ))}
                    </div>
                </div>
            )}

            {/* Older */}
            {groupedPosts.older.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Older</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedPosts.older.map((post) => (
                            <PostCard key={post.id} {...post} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Helpers for date filtering
const isToday = (date) => {
    const today = new Date();
    const postDate = new Date(date);
    return (
        today.getDate() === postDate.getDate() &&
        today.getMonth() === postDate.getMonth() &&
        today.getFullYear() === postDate.getFullYear()
    );
};

const isLastWeek = (date) => {
    const today = new Date();
    const postDate = new Date(date);
    const diffDays = (today - postDate) / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays <= 7;
};

const isLastMonth = (date) => {
    const today = new Date();
    const postDate = new Date(date);
    return (
        postDate.getMonth() === today.getMonth() - 1 &&
        postDate.getFullYear() === today.getFullYear()
    );
};

export default PostsList;
