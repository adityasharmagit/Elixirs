import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8030" : "/";

export const useGalleryStore = create((set) => ({
    wallpapers: [],
    singleWallpaper: null,
    isLoadingGallery: false,
    isLoadingSingle: false,
    isLoading: false,
    error: null,

    fetchWallpaper: async () => {
        set({ isLoadingGallery: true, error: null });
        
        try {
            const res = await axiosInstance.get("/elixir/");
            set({ wallpapers: res.data });
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch Gallery";
            set({ error: message });
            toast.error(message);
        } finally {
            set({ isLoadingGallery: false });
        }
    },

    fetchWallpaperById: async (id) => {
        set({ isLoadingSingle: true, error: null });

        try {
            const res = await axiosInstance.get(`/elixir/wall/${id}`);
            set({ singleWallpaper: res.data });
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch wallpaper";
            set({ error: message, singleWallpaper: null });
            toast.error(message);
        } finally {
            set({ isLoadingSingle: false });
        }
    },

    createWallpaper: async (formData) => {
        try {
            const res = await axiosInstance.post("/elixir/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Wallpaper created!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create wallpaper");
        }
    },

    editWallpaper: async (id, formData) => {
        try {
            const res = await axiosInstance.put(`/elixir/edit/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Wallpaper updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update wallpaper");
        }
    },

    fetchWallpapersByUser: async (userId) => {
        set({ isLoadingGallery: true, error: null });
        
        try {
            const res = await axiosInstance.get(`/elixir/user/${userId}`);
            set({ wallpapers: res.data });
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch user's wallpapers";
            set({ error: message });
            toast.error(message);
        } finally {
            set({ isLoadingGallery: false });
        }
    },

    deleteWallpaper: async (id) => {
        try {
            const res = await axiosInstance.delete(`/elixir/delete/${id}`);
            toast.success("Wallpaper deleted successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete wallpaper");
        }
    },
}));