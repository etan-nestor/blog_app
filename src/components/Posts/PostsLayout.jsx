/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import PostsList from "./PostsList";

const PostsLayout = ({ posts }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    // Filtrer les posts selon la recherche et le filtre
    const filteredPosts = posts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filter === "all" ||
            (filter === "today" && isToday(post.date)) ||
            (filter === "last-week" && isLastWeek(post.date)) ||
            (filter === "last-month" && isLastMonth(post.date));
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6">Posts</h1>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
            />
            <PostsList posts={filteredPosts} />
        </div>
    );
};

export default PostsLayout;
