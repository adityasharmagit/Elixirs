const generateToken = require("../config/jwt.js");
const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

const getPublicIdFromUrl = (url) => {
    const uploadIndex = url.indexOf("/upload/");
    const path = url.substring(uploadIndex + 8);
    return path.replace(/v\d+\//, "").replace(/\.[^/.]+$/, "");
}

//* Signup
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

//* Login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

//* Logout
const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

//* Update Profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const user = await User.findById(userId);

        if (user.profilePic) {
            const oldPublicId = getPublicIdFromUrl(user.profilePic);
            await cloudinary.uploader.destroy(oldPublicId);
        }

        user.profilePic = req.file.path;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in update profile: ", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

//* Check Auth
const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.profilePic) {
            const publicId = getPublicIdFromUrl(user.profilePic);
            await cloudinary.uploader.destroy(publicId);
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log("Error deleting user:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Export all
module.exports = {
    signup,
    login,
    logout,
    updateProfile,
    checkAuth,
    deleteUser,
};
