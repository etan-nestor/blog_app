/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = ({ searchTerm, setSearchTerm, selectedDate, setSelectedDate, filter, setFilter }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="bg-gray-800 text-white flex flex-wrap items-center justify-between p-3 shadow-md rounded-md w-full">
            {/* Search Input */}
            <div className="flex items-center gap-2 w-full md:w-1/3">
                <div className={`relative w-full ${isFocused ? "ring ring-orange-400" : ""}`}>
                    <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Rechercher..."
                        className="w-full px-10 py-2 rounded-md border border-gray-700 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
            </div>

            {/* Date Picker */}
            <div className="relative w-full md:w-1/3 flex justify-center items-center mt-2 md:mt-0">
                <div className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-md hover:bg-orange-600 transition-all duration-300">
                    <FaCalendarAlt className="text-gray-200" />
                    <DatePicker
                        selected={selectedDate}
                        onChange={setSelectedDate}
                        dateFormat="yyyy-MM-dd"
                        className="bg-gray-900 p-1 text-white outline-none w-full cursor-pointer"
                    />
                    <span className="text-sm ml-2">
                        {selectedDate ? selectedDate.toLocaleDateString("fr-FR") : "Sélectionner"}
                    </span>
                </div>
            </div>

            {/* Filter Selection */}
            <div className="flex items-center gap-2 w-full md:w-1/3 justify-end mt-2 md:mt-0">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full md:max-w-xs px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:ring focus:ring-orange-600 outline-none"
                >
                    <option value="this-week">Cette semaine</option>
                    <option value="last-week">La semaine dernière</option>
                    <option value="last-month">Le mois dernier</option>
                    <option value="all">Tout le temps</option>
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
