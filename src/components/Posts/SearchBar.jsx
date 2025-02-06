/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = ({ searchTerm, setSearchTerm, filter, setFilter }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Date par défaut : aujourd'hui

    return (
        <div className="bg-gray-800 fixed text-white flex items-center justify-between p-3 shadow-md rounded-sm -mt-[5.5rem] w-full z-10">
            {/* Search Input */}
            <div className="flex items-center gap-2 w-1/3">
                <div className={`relative ${isFocused ? "ring ring-orange-400" : ""}`}>
                    <FaSearch className="absolute top-2.5 left-3 text-gray-400 animate-pulse" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search..."
                        className="w-full px-10 py-2 rounded-md border border-gray-700 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
            </div>

            {/* Date Picker Icon */}
            <div className="relative w-1/3 flex justify-center items-center">
                <div className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-md hover:bg-orange-600 transition-all duration-300">
                    <FaCalendarAlt className="text-gray-200" />
                    <DatePicker
                        selected={selectedDate}
                        onChange={(newDate) => {
                            setSelectedDate(newDate); // Mettre à jour la date sélectionnée
                            // Assure-toi de transmettre la date correctement formatée à PostsLayout si nécessaire
                        }}
                        dateFormat="yyyy-MM-dd"
                        className="bg-gray-900 p-1 hover:bg-white hover:text-gray-900 hover:font-semibold text-white outline-none w-full"
                    />

                    <span className="text-sm ml-2">
                        {selectedDate.toLocaleDateString("en-CA")} {/* Affiche la date sélectionnée */}
                    </span>
                </div>
            </div>

            {/* Filter Selection */}
            <div className="flex items-center gap-2 w-1/3 justify-end">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full max-w-xs px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:ring focus:ring-orange-600 outline-none"
                >
                    <option value="this-week">This Week</option>
                    <option value="last-week">Last Week</option>
                    <option value="last-month">Last Month</option>
                    <option value="all">All Time</option>
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
