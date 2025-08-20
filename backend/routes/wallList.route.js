const express = require("express");
const { gallery, showWall, createWall, editWallpaper, deleteWallpaper, getWallpaperByUser } = require("../controller/wallList.controller.js");
const { protectRoute, isOwner, validateWallpaper } = require("../middleware/user.middleware.js");
const { upload } = require("../middleware/upload.middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

const router = express.Router();

router.get("/", wrapAsync(gallery));
router.get("/wall/:id", wrapAsync(showWall));
router.post("/create", protectRoute, upload.single("wallpaperImage"), validateWallpaper, wrapAsync(createWall));
router.put("/edit/:id", protectRoute, isOwner, upload.single("wallpaperImage"), validateWallpaper, wrapAsync(editWallpaper));
router.delete("/delete/:id", protectRoute, isOwner, wrapAsync(deleteWallpaper));
router.get("/user/:id", wrapAsync(getWallpaperByUser));

module.exports = router;