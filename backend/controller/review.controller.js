const Review = require("../models/Review.model.js");
const WallList = require("../models/wallList.model.js");

const createReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }
        if (!comment || comment.trim().length < 3) {
            return res.status(400).json({ message: "Comment is too short" });
        }

        const wallpaper = await WallList.findById(id).populate("reviews");
        if (!wallpaper) {
            return res.status(404).json({ message: "Wallpaper not found" });
        }

        const alreadyReviewed = wallpaper.reviews.find(
            (rev) => rev.author.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
            return res.status(400).json({ message: "You have already reviewed this wallpaper" });
        }

        const newReview = new Review({
            comment,
            rating,
            author: req.user._id,
        });

        await newReview.save();

        wallpaper.reviews.push(newReview._id);

        const allReviews = await Review.find({ _id: { $in: wallpaper.reviews } });
        const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
        wallpaper.avgRating = avgRating; 

        await wallpaper.save();

        res.status(201).json({ message: "New review created!", review: newReview });
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const deleteReview = async(req, res) => {
    try {
        const { id, reviewId } = req.params;

        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        await WallList.findByIdAndUpdate(id, {
            $pull: { reviews: reviewId }
        });

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    createReview,
    deleteReview,
};
