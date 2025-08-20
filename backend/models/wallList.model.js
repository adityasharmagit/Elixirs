const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./Review.model.js");

const wallListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        url: { type: String, default: "" },
        filename: { type: String, default: "" }
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ["Nature", "Anime", "Abstract", "Technology", "Space", "Gaming", "Minimal", "City", "Cars", "Animals", "Fantasy", "Sports", "Movies"],
            message: '{VALUE} is not a valid category',
        },
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true });

//*Delete Listing with all of its Reviews to.
wallListSchema.post("findOneAndDelete", async (wallpaper) => {
    if (wallpaper && wallpaper.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: wallpaper.reviews } });
    }
});

const WallList = mongoose.model("WallList", wallListSchema);
module.exports = WallList;