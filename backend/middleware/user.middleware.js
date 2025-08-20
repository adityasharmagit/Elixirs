const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const WallList = require("../models/wallList.model.js");
const Review = require("../models/Review.model.js");
const wallpaperSchema = require("../utils/schema.validation.js");

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user

        next()

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const isOwner = async(req, res, next) => {
    try {
        const { id } = req.params;
        const wallpaper = await WallList.findById(id);

        if(!wallpaper) {
            return res.status(404).json({ message: "Wallpaper doesn't exist!"});
        }

        if(!wallpaper.owner.equals(req.user._id)) {
            return res.status(403).json({ message: "You are not the owner of this wallpaper" });
        }

        next();
    } catch (error) {
        console.log("Error in isOwner middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const validateWallpaper = (req, res, next) => {
    const { error } = wallpaperSchema.validate(req.body.wallpaper);

    if (error) {
        return res.status(400).json({
            message: error.details.map((e) => e.message).join(", "),
        });
    }

    console.log("Parsed wallpaper object:", req.body.wallpaper);
    next();
};

const isReviewAuthor = async (req, res, next) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (!review.author.equals(req.user._id)) {
            return res.status(403).json({ message: "You didn't created it!" });
        }

        next();
    } catch (error) {
        console.error("Error in isReviewAuthor middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    protectRoute,
    isOwner,
    validateWallpaper,
    isReviewAuthor,
};