import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import StarRating from "../design/StarRating";

const CommentsSection = ({ singleWallpaper, authUser, handleDelete }) => {
    const [visibleCount, setVisibleCount] = useState(1); 

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 1); 
    };

    const reviews = singleWallpaper?.reviews || [];

    return reviews.length > 0 ? (
    <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold">Comments</h3>
        {reviews.slice(0, visibleCount).map((review) => (
        <div
            key={review._id}
            className="flex justify-between items-start p-3 border rounded-md bg-base-200 flex-wrap gap-2"
        >
        <div>
            <p className="text-base-content font-thin">{review.comment}</p>
            <StarRating
                maxRating={5}
                rating={review.rating}
                readOnly
                name={`review-${review._id}`}
            />
            <p className="text-sm text-base-content/60 -mt-4">
                — {review.author?.username || "Anonymous"}
            </p>
        </div>
            {authUser &&
            (review.author?._id === authUser._id ||
                singleWallpaper.owner?._id === authUser._id) && (
                <Trash2
                onClick={() => handleDelete(review._id)}
                className="w-4 h-4 text-base-content/60 cursor-pointer hover:text-red-500 transition hover:rotate-45 duration-500"
                title="Delete comment"
                />
            )}
        </div>
        ))}

      {/* Show More Button */}
        {visibleCount < reviews.length && (
        <button
            onClick={handleShowMore}
            className="text-sm text-primary underline hover:opacity-80 transition"
        >
            Show more comments
        </button>
        )}
    </div>
    ) : (
        <p className="mt-4 text-base-content/50">No comments yet.</p>
    );
};

export default CommentsSection;
