import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8030" : "/";

export const useReviewStore = create((set) => ({
    isReviewing: false,
    isDeleting: false,
    error: null,

    createReview: async (wallId, reviewData) => {
        set({ isReviewing: true, error: null });

        try {
            await axiosInstance.post(`/elixir/wall/${wallId}/review`, reviewData);
            toast.success("Your comment has been added!");
        } catch (error) {
            const message = error.response?.data?.message || "Failed to add comment";
            set({ error: message });
            toast.error(message);
        } finally {
            set({ isReviewing: false });
        }
    },

    deleteReview: async (wallId, reviewId) => {
        set({ isDeleting: true, error: null });

        try {
            await axiosInstance.delete(`/elixir/wall/${wallId}/review/${reviewId}`);
            toast.success("Comment has been deleted");
        } catch (error) {
            const message = error.response?.data?.message || "Failed to delete comment!";
            set({ error: message });
            toast.error(message);
        } finally {
            set({ isDeleting: false });
        }
    }
}));