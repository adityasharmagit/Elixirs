import React, { useEffect, useState } from 'react';
import { useGalleryStore } from '../store/useGalleryStore';
import { Link } from "react-router-dom";
import CategoryFilter from './include/CategoryFilter';

const Gallery = ({ excludeId, category: propCategory }) => {
    const { wallpapers, fetchWallpaper, isLoadingGallery, error } = useGalleryStore();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const categoryColors = {
        Nature: "bg-green-500",
        Anime: "bg-violet-700",
        Movies: "bg-teal-500",
        Abstract: "bg-purple-500",
        Technology: "bg-blue-500",
        Space: "bg-gray-900",
        Gaming: "bg-red-500",
        Minimal: "bg-pink-500",
        City: "bg-yellow-600",
        Cars: "bg-orange-500",
        Animals: "bg-lime-600",
        Fantasy: "bg-fuchsia-600",
        Sports: "bg-indigo-600",
    };

    useEffect(() => {
        fetchWallpaper();
    }, []);

    useEffect(() => {
        if (propCategory) {
            setSelectedCategory(propCategory);
        }
    }, [propCategory]);

    if (isLoadingGallery) {
        return <div className="text-center py-10 text-lg font-semibold">Loading wallpapers...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    const filteredWallpapers = wallpapers.filter((wall) => {
        const isNotExcluded = excludeId ? wall._id !== excludeId : true;
        const isCategoryMatch = selectedCategory === "All" || wall.category === selectedCategory;
        const isSearchMatch = wall.title.toLowerCase().includes(searchTerm.toLowerCase());
        return isNotExcluded && isCategoryMatch && isSearchMatch;
    });

    const sortedWallpapers = filteredWallpapers.sort(
        (a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0)
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1
                className="mt-16 text-3xl font-bold mb-6 bg-gradient-to-l from-secondary via-primary to-accent text-transparent bg-clip-text transition-all duration-500"
                style={{
                    textShadow: "0 0 10px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.3)"
                }}
                data-aos="flip-down"
                data-aos-delay="200"
            >
                "From Pixels to Perfection — Explore the Gallery,,
            </h1>
            
            <div className="mb-6 flex justify-start">
                <input
                    type="text"
                    placeholder="Search wallpapers by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 rounded-2xl 
                        border border-white/10 
                        bg-white/10 backdrop-blur-md 
                        focus:outline-none focus:ring-1 focus:ring-primary 
                        text-primary placeholder-primary
                        shadow-lg"
                />
            </div>

            {!propCategory && (
                <CategoryFilter 
                    selectedCategory={selectedCategory}
                    onChange={setSelectedCategory}
                />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" data-aos="zoom-in" data-aos-delay="200">
                {sortedWallpapers.map((wall) => (
                    <Link to={`/elixir/wall/${wall._id}`} key={wall._id}>
                        <div className="relative group bg-base-100 rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition-transform">
                            <span className="absolute bottom-28 ml-28 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow">
                                <p className={`ml-1 text-xs font-semibold w-20 mt-2 py-1 rounded-md text-white text-center 
                                    ${categoryColors[wall.category] || 'bg-slate-500'}`}>
                                    {wall.category}
                                </p>
                            </span>
                            <img
                                src={wall.image.url.replace("/upload/", "/upload/w_1200,q_90,f_auto/")}
                                alt={wall.title}
                                className="w-full h-60 object-cover"
                                loading='lazy'
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{wall.title}</h2>
                                <p className="text-sm line-clamp-1">{wall.description}</p>
                                <p className="text-xs text-gray-500 mt-1">⭐ {wall.reviews?.length || 0} reviews</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Gallery;  