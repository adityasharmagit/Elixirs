const WallList = require("../models/wallList.model.js");
const { cloudinary } = require("../middleware/upload.middleware.js");

const gallery = async(req, res) => {
    try {
        const allWallLists = await WallList.find({}).lean();
        res.status(200).json(allWallLists);
    } catch (error) {
        console.log("Error fetching gallery:", error);
        res.status(500).json({ message: "Failed to fetch wallpapers" });
    }
};

const showWall = async (req, res) => {
    try {
        const {id} = req.params;
        const wallpaper = await WallList.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
        
        if(!wallpaper) {
            return res.status(404).json({ message: "Wallpaper you requested does not exist!"});
        }
        res.status(200).json(wallpaper);
    } catch (error) {
        console.log("Error getting wallpaper:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
};


const createWall = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded." });
        }

        const { path: url, filename } = req.file;

        const rawWallpaper = req.body.wallpaper;
        const parsedWallpaper =
            typeof rawWallpaper === "string"
                ? JSON.parse(rawWallpaper)
                : rawWallpaper;

        const wallpaper = JSON.parse(JSON.stringify(parsedWallpaper));

        const newWallpaper = new WallList({
            ...wallpaper,
            owner: req.user._id,
            image: { url, filename },
        });

        await newWallpaper.save();

        res.status(201).json({
            message: "New Wallpaper Created.",
            wallpaper: newWallpaper,
        });
    } catch (error) {
        console.error("Error creating new wallpaper:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const editWallpaper = async (req, res) => {
    try {
        const { id } = req.params;
        const wallpaper = await WallList.findById(id);

        if (!wallpaper) {
            return res.status(404).json({ message: "Wallpaper you requested does not exist!" });
        }

        const { title, description, category } = req.body;
        if (title) wallpaper.title = title;
        if (description) wallpaper.description = description;
        if (category) wallpaper.category = category;

        if (req.file) {
            if (wallpaper.image?.filename) {
            await cloudinary.uploader.destroy(wallpaper.image.filename);
            }
            const { path: url, filename } = req.file;
            wallpaper.image = { url, filename };
        }

        await wallpaper.save();

        let resizedUrl = wallpaper.image?.url || "";
        if (resizedUrl.includes("/upload/")) {
            resizedUrl = resizedUrl.replace("/upload", "/upload/w_250");
        }

        res.status(200).json({
            message: "Wallpaper updated successfully",
            updatedWallpaper: {
            ...wallpaper._doc,
            resizedUrl,
            },
        });
    } catch (error) {
        console.error("Error editing wallpaper:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteWallpaper = async (req, res) => {
    try {
        const { id } = req.params;
        let wallpaper = await WallList.findByIdAndDelete(id);

        if(!wallpaper) {
            return res.status(404).json({ message: "wallpaper not found" });
        }

        if(wallpaper.image?.filename) {
            await cloudinary.uploader.destroy(wallpaper.image.filename);
        }

        res.status(200).json({ message: "Wallpaper has been deleted!" });
    } catch (error) {
        console.log("Error deleting wallpaper:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getWallpaperByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const wallpaper = await WallList.find({ owner: id }).lean();
    
        if(!wallpaper || wallpaper.length === 0) {
            return res.status(404).json({ message: "No wallpaper found from this profile"});
        }
        res.status(200).json(wallpaper);
    } catch (error) {
        console.log("Error fetching wallpapers by user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    gallery,
    showWall,
    createWall,
    editWallpaper,
    deleteWallpaper,
    getWallpaperByUser,
};