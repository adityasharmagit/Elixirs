import React, { useEffect, useState } from 'react'
import { useGalleryStore } from '../../store/useGalleryStore'
import toast from 'react-hot-toast';

const categories = ["Nature", "Anime", "Abstract", "Technology", "Space", "Gaming", "Minimal", "City", "Cars", "Animals", "Fantasy", "Sports", "Movies"];

const UploadWall = () => {
    const { createWallpaper } = useGalleryStore();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile || !title || !category) {
            return toast.error("Title, Category, and Image are required.");
        }

        const formData = new FormData();
        formData.append("wallpaper[title]", title);
        formData.append("wallpaper[description]", description);
        formData.append("wallpaper[category]", category);
        formData.append("wallpaperImage", imageFile);

        await createWallpaper(formData);

        setTitle("");
        setDescription("");
        setCategory("");
        setImageFile(null);
        setPreview(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const categoryColors = {
        Nature: "border-green-500",
        Anime: "border-violet-600",
        Movies: "border-teal-500",
        Abstract: "border-purple-500",
        Technology: "border-blue-500",
        Space: "border-gray-900",
        Gaming: "border-red-500",
        Minimal: "border-pink-500",
        City: "border-yellow-600",
        Cars: "border-orange-500",
        Animals: "border-lime-600",
        Fantasy: "border-fuchsia-600",
        Sports: "border-indigo-600",
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="max-w-2xl h-[690px] mx-auto mt-16 p-6 bg-base-100 rounded-xl -mb-20">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-l from-secondary to-primary text-transparent bg-clip-text transition-all duration-500 mt-10">Upload new Wallpaper</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label font-medium">Title</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="label font-medium">Description</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label className="label font-medium">Category</label>
                    <select
                        className={`select select-bordered w-full transition-all duration-200 ${
                            categoryColors[category] || "border-gray-300"
                        }`}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {Object.keys(categoryColors).map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                    </select>
                </div>

                <div>
                    <label className="label font-medium">Wallpaper Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="mt-4 rounded-lg w-full h-[190px] object-cover"
                    />
                )}

                <button type="submit" className="btn btn-primary w-full">
                    Upload Wallpaper
                </button>
            </form>
        </div>
    );
}

export default UploadWall
