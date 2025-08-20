import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGalleryStore } from "../../store/useGalleryStore";
import { useReviewStore } from "../../store/useReviewStore";
import Gallery from "../Gallery";
import { Download, Trash2, Send, Edit2Icon } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import StarRating from "../design/StarRating";
import CommentsSection from "./Comments";

const ShowWallpaper = () => {
    const { id } = useParams();
    const [userRating, setUserRating] = useState(0);
    const [commentText, setCommentText] = useState("");

    const {
        singleWallpaper,
        fetchWallpaperById,
        isLoading,
        error,
    } = useGalleryStore();

    const { createReview, deleteReview } = useReviewStore();

    const [showGallery, setShowGallery] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const navigate = useNavigate();
    const { authUser } = useAuthStore();

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
        if (id) {
        fetchWallpaperById(id);
        setShowGallery(true);
        }
    }, [id]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);

    useEffect(() => {
    if (id) {
        fetchWallpaperById(id);
        setShowGallery(true);
    }
    }, [id]);

    if (isLoading) {
        return <div className="text-center py-10 text-lg font-semibold">Loading wallpaper...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    if (!singleWallpaper) {
        return <div className="text-center py-10 text-gray-500">Wallpaper not found.</div>;
    }

    const avgRating = singleWallpaper.reviews?.length
        ? singleWallpaper.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / singleWallpaper.reviews.length
        : 0;

    const handleCommentSubmit = async () => {
        if (!commentText.trim() || userRating < 1 || userRating > 5) return;

        await createReview(id, {
            comment: commentText,
            rating: userRating,
        });

        setCommentText("");
        setUserRating(0); 
        fetchWallpaperById(id); 
    };

    const handleDelete = async (reviewId) => {
        await deleteReview(id, reviewId);
        fetchWallpaperById(id);
    };
    

    const getDownloadUrl = (url) => {
        if (!url) return "#";
        return url.replace("/upload/", "/upload/fl_attachment/");
    };

    if (isLoading) {
        return <div className="text-center py-10 text-lg font-semibold">Loading wallpaper...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    if (!singleWallpaper) {
        return <div className="text-center py-10 text-gray-500">Wallpaper not found.</div>;
    }

    return (
        <>
            <div className="mt-10 pt-8 px-4 sm:px-8 md:px-16 xl:px-24">
                <img
                    src={singleWallpaper.image?.url}
                    alt={singleWallpaper.title}
                    className="w-full max-h-[700px] object-cover rounded-xl shadow-md"
                />

                <div className="mt-6 flex flex-col md:flex-row justify-between gap-6">
                    {/* Left Side: Title & Description */}
                    <div className="flex-1">
                        <h1 className="ml-1 text-3xl font-bold mb-2">{singleWallpaper.title}</h1>
                        <p className="ml-1 text-lg bg-gradient-to-l from-primary to-primary text-transparent bg-clip-text transition-all duration-500">{singleWallpaper.description}</p>
                        <p className={`ml-1 text-xs font-semibold w-20 mt-2 py-1 rounded-md text-white text-center 
                            ${categoryColors[singleWallpaper.category] || 'bg-slate-500'}`}>
                            {singleWallpaper.category}
                        </p>

                        <div className="mt-4">
                            <h3 className="ml-1 text-base font-medium mb-1">Average Rating</h3>
                            <StarRating maxRating={5} rating={Math.round(avgRating)} readOnly />
                            <p className="-mt-5 ml-1 text-sm text-base-content/60">({avgRating.toFixed(1)} from {singleWallpaper.reviews.length} reviews)</p>
                        </div>

                        {/* Comment Box */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold mb-2">Add a Comment</h3>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h5 className="text-sm font-semibold">Give Your <span className="text-yellow-600 font-semibold">Stars</span>:</h5>
                                <div className="w-full -mb-4">
                                    <StarRating
                                        maxRating={5}
                                        rating={userRating}
                                        onChange={(value) => setUserRating(value)}
                                        name="user-rating"
                                    />
                                </div>
                                <input 
                                    type="text"
                                    placeholder="Write a comment..."
                                    className="input input-bordered w-full sm:flex-1 h-10"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                />
                                <div className="relative group p-3 bg-base-200 rounded-full">
                                    <span className="w-60 ml-20 absolute top-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Give Stars before adding your comment.
                                    </span>
                                    <Send
                                        className="size-4 transition-transform group-hover:rotate-45 duration-500 cursor-pointer"
                                        onClick={handleCommentSubmit}
                                    />
                                </div>
                            </div>

                            {/* Comments */}
                            <CommentsSection
                                singleWallpaper={singleWallpaper}
                                authUser={authUser}
                                handleDelete={handleDelete}
                            />
                        </div>
                    </div>
                        
                    {/* Right Side: Uploader Info */}
                    <div className="flex flex-col items-start md:items-end w-full md:w-1/3 space-y-4">
                        <div className="flex items-center">
                            <img
                                src={singleWallpaper.owner?.profilePic || "/avatar.png"}
                                alt="ProfilePic"
                                className="size-10 rounded-full object-cover border-4"
                            />
                            <div className="ml-2 text-right">
                                <p className="mr-2 text-sm text-base-content/80">Uploaded by:</p>
                                <p className="mr-2 text-base-content/90 font-bold">{singleWallpaper.owner?.username}</p>
                            </div>
                        </div>
                        
                        <p className="mr-2 text-sm text-base-content/70">
                            Uploaded on: {new Date(singleWallpaper.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </p>
                        
                        <div className="mr-2 flex items-center gap-4">
                            {authUser?. _id && singleWallpaper?.owner?._id && authUser._id === singleWallpaper.owner._id && (
                                <div className="relative group p-3 bg-base-200 rounded-full">
                                    <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Delete
                                    </span>
                                    
                                    <Trash2
                                        onClick={() => setShowConfirmModal(true)}
                                        className="w-4 h-4 cursor-pointer transition-transform group-hover:-rotate-45 duration-500"
                                    />
                                </div>
                            )}
                            {authUser?._id === singleWallpaper?.owner?._id && (
                                <Link to={`/elixir/edit/${singleWallpaper._id}`} className="relative group p-3 bg-base-200 rounded-full">
                                    <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Edit
                                    </span>
                                    <Edit2Icon className="size-4 transition-transform group-hover:-rotate-180 duration-500 text-primary"/>
                                </Link>
                            )}

                            <a
                                href={getDownloadUrl(singleWallpaper.image?.url)}
                                download
                                >
                                <div className="relative group p-3 bg-base-200 rounded-full">
                                    <span className="w-24 absolute top-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Download HD..
                                    </span>
                                        <Download className="size-4 transition-transform group-hover:animate-bounce text-secondary" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                {showConfirmModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-base-100 rounded-xl shadow-lg p-6 w-full max-w-sm">
                            <h2 className="text-lg font-semibold mb-4 text-center text-red-500">Confirm Wallpaper Deletion</h2>
                                <p className="text-sm text-center text-zinc-400 mb-6">
                                    Are you sure you want to delete this Wallpaper? This action is <strong>permanent</strong> and cannot be undone.
                                </p>
                                <div className="flex justify-between gap-4">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="w-full py-2 rounded-md bg-base-300 hover:bg-base-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={async () => {
                                        await useGalleryStore.getState().deleteWallpaper(singleWallpaper._id);
                                        setShowConfirmModal(false);
                                        navigate("/");
                                    }}
                                    className="w-full py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="h-[2px] my-10 -mb-12 max-w-7xl mx-auto bg-gradient-to-l from-secondary to-primary rounded-full" />

            {showGallery && singleWallpaper?.category && (
                <section>
                    <Gallery 
                        category={singleWallpaper.category} 
                        excludeId={singleWallpaper._id} 
                    />
                </section>
            )}
        </>
    );
};

export default ShowWallpaper;
