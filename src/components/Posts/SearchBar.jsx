/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, filter, setFilter }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            {/* Search Input */}
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title..."
                className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-orange-300 outline-none"
            />

            {/* Date Filter */}
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-orange-300 outline-none"
            >
                <option value="today">Today</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="all">All Posts</option>
            </select>
        </div>
    );
};

export default SearchBar;
