import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8030" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSignUp: false,
    isLogIn: false,
    isUpdateProfile: false,
    isCheckAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/user/check");
            set({authUser:res.data});
        } catch (error) {
            console.log("Error in check", error);
            set({authUser:null});
        } finally{
            set({isCheckAuth:false});
        }
    },
    
    signup: async (data) => {
        set ({isSignUp:true});
        try {
            const res = await axiosInstance.post("/user/signup", data);
            set({authUser: res.data});
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isSignUp:false});
        }
    },

    login: async (data) => {
        set({isLogIn:true});
        try {
            const res = await axiosInstance.post("/user/login", data);
            set({authUser:res.data});
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isLogIn:false});
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/user/logout");
            set({ authUser: null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdateProfile: true });

        try {
            const formData = new FormData();

            if (
                !data.profilePic ||
                !data.profilePic.name ||
                !data.profilePic.type ||
                !data.profilePic.type.startsWith("image/")
            ) {
                toast.error("Please select a valid image file.");
                set({ isUpdateProfile: false });
                return;
            }

            formData.append("profilePic", data.profilePic);

            const res = await axiosInstance.put("/user/update-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in update profile", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isUpdateProfile: false });
        }
    },

    deleteUser: async () => {
        try {    
            set({ isDeleting: true });

            await axiosInstance.delete(`/user/delete`);

            set({ authUser: null });
            toast.success("User deleted successfully");

        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete user");
        } finally {
            set({ isDeleting: false });
        }
    },
}));

