import React, { useEffect, useRef } from "react";

const categories = [
    "All",
    "Nature",
    "Anime",
    "Movies",
    "Abstract",
    "Technology",
    "Space",
    "Gaming",
    "Minimal",
    "City",
    "Cars",
    "Animals",
    "Fantasy",
    "Sports",
];

const categoryColors = {
    Nature: "bg-green-500 text-white border-green-500",
    Movies: "bg-teal-500 text-white border-teal-500",
    Anime: "bg-violet-600 text-white border-violet-600",
    Abstract: "bg-purple-500 text-white border-purple-500",
    Technology: "bg-blue-500 text-white border-blue-500",
    Space: "bg-gray-900 text-white border-gray-900",
    Gaming: "bg-red-500 text-white border-red-500",
    Minimal: "bg-pink-500 text-white border-pink-500",
    City: "bg-yellow-600 text-white border-yellow-600",
    Cars: "bg-orange-500 text-white border-orange-500",
    Animals: "bg-lime-600 text-white border-lime-600",
    Fantasy: "bg-fuchsia-600 text-white border-fuchsia-600",
    Sports: "bg-indigo-600 text-white border-indigo-600",
    All: "bg-orange-700 text-white border-orange-700",
};


const CategoryFilter = ({ selectedCategory, onChange }) => {
    const categoryRefs = useRef({});

    useEffect(() => {
        const selectedRef = categoryRefs.current[selectedCategory];
        if (selectedRef) {
            selectedRef.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
    }, [selectedCategory]);

    return (
        <div className="mb-8 -mt-2">
        <div
            className="flex md:justify-center gap-3 overflow-x-auto scrollbar-hide px-1 py-2"
        >
        {categories.map((category) => (
            <label
                key={category}
                className={`flex-shrink-0 px-4 py-2 text-sm rounded-full cursor-pointer border whitespace-nowrap transition-all duration-200 transform ease-out active:scale-95
                ${
                selectedCategory === category
                    ? `shadow-lg animate-pulse ${categoryColors[category]}`
                    : "bg-gray-100 text-gray-800 border-gray-300"
                }`}
            >
            <input
                type="radio"
                name="category"
                value={category}
                className="hidden"
                onChange={() => onChange(category)}
                checked={selectedCategory === category}
            />
                {category}
            </label>
        ))}
        </div>
    </div>
    );
};

export default CategoryFilter;
