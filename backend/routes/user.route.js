const express = require ("express");
const {protectRoute} = require ("../middleware/user.middleware.js");
const { signup, login, logout, updateProfile, checkAuth, deleteUser } = require ("../controller/user.controller.js");
const { upload } = require("../middleware/upload.middleware.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, upload.single("profilePic"), updateProfile);
router.get("/check", protectRoute, checkAuth);
router.delete("/delete", protectRoute, deleteUser);

module.exports = router;
