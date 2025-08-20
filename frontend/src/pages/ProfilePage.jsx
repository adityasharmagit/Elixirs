import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useGalleryStore } from "../store/useGalleryStore";
import { Camera, Mail, User, Trash2, Loader } from "lucide-react";
import WallpaperCard from "../components/include/WallpaperCard";
import SplineViewer from "../components/design/SplineViewer";

const ProfilePage = () => {
    const { authUser, isUpdateProfile, updateProfile, isCheckAuth } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { wallpapers, fetchWallpapersByUser, isLoadingGallery, error, } = useGalleryStore();

    useEffect(() => {
        if (authUser?._id) {
            fetchWallpapersByUser(authUser._id);
        }
    }, [authUser]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    if (isCheckAuth) return (
        <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin"/>
        </div>
    )

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedImg(URL.createObjectURL(file));
        await updateProfile({ profilePic: file });
    };

    return (
        <div className="min-h-screen pt-20 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Left Section: Profile */}
                <div className="w-full md:w-1/2">
            <div className="bg-base-300 rounded-xl p-6 space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Profile</h1>
                    <p className="mt-2">Your profile information</p>
                </div>

                {/* Avatar Upload */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <img
                            src={selectedImg || authUser.profilePic || "/avatar.png"}
                            alt="avatar"
                            className="size-32 rounded-full object-cover border-4"
                        />
                        <label
                            htmlFor="avatar-upload"
                            className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                            isUpdateProfile ? "animate-pulse pointer-events-none" : ""
                            }`}
                        >
                            <Camera className="w-5 h-5 text-base-200" />
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUpdateProfile}
                            />
                        </label>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-400">
                            {isUpdateProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                        </p>
                    </div>
                </div>

            {/* Info Fields */}
            <div className="space-y-6">
                <div className="space-y-1.5">
                    <div className="inline-flex text-sm text-zinc-400 items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                    </div>
                    <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.username}</p>
                </div>

                <div className="space-y-1.5">
                    <div className="inline-flex text-sm text-zinc-400 items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                    </div>
                    <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
                </div>
            </div>

            {/* Account Info */}
            <div className="mt-6 bg-base-300 rounded-xl p-6">
                <h2 className="text-lg font-medium mb-4">Account Information</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                            <span className="pb-2">Member Since</span>
                            <span className="pb-2">{authUser.createdAt?.split("T")[0]}</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span>Account Status</span>
                            <span className="text-green-500">Active</span>
                        </div>
                        <hr className="my-4 border-zinc-700" />
                        <div className="flex justify-between mt-6">
                            <span className="mt-2">Delete Profile and its related data</span>
                            <Trash2
                                onClick={() => setShowConfirmModal(true)}
                                className="mt-2 justify-end w-4 h-4 cursor-pointer hover:text-red-500 transition"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

            {/* Right Section: Spline Viewer */}
            <div className="w-full h-full flex flex-col items-center px-4 py-8 gap-8">

                {/* Top Section: Spline Viewer */}
                {/* <SplineViewer/> */}

                {/* Bottom Section: Wallpaper Grid */}
                <div className="w-full max-w-6xl bg-base-200 p-6 rounded-xl shadow-md">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                        {authUser?.username}<span className="bg-gradient-to-l from-primary to-primary text-transparent bg-clip-text transition-all duration-500">'s wallpapers</span>
                    </h1>

                    {isLoadingGallery ? (
                        <Loader />
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : wallpapers.length === 0 ? (
                        <p className="text-center text-gray-500">
                            You haven't uploaded any wallpapers yet.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {wallpapers.map((wall) => (
                                <WallpaperCard key={wall._id} wall={{
                                    ...wall,
                                    imageUrl: `${wall.image.url}?q=30&format=webp&width=200`,
                                }} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Confirm Modal */}
        {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-base-100 rounded-xl shadow-lg p-6 w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4 text-center text-red-500">
                    Confirm Account Deletion
                </h2>
                <p className="text-sm text-center text-zinc-400 mb-6">
                    Are you sure you want to delete your account? This action is <strong>permanent</strong> and cannot be undone.
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
                        await useAuthStore.getState().deleteUser();
                        setShowConfirmModal(false);
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
    );
};

export default ProfilePage;
