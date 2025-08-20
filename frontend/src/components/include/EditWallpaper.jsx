import React, {useEffect, useState} from 'react'
import { useGalleryStore } from '../../store/useGalleryStore'
import { useNavigate, useParams } from 'react-router-dom';

const EditWallpaper = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { editWallpaper, singleWallpaper, fetchWallpaperById, isLoading } = useGalleryStore();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const categories = ["Nature", "Anime", "Abstract", "Technology", "Space", "Gaming", "Minimal", "City", "Cars", "Animals", "Fantasy", "Sports", "Movies"];


    useEffect(() => {
        fetchWallpaperById(id);
    }, [id]);

    useEffect(() => {
        if (singleWallpaper) {
            setTitle(singleWallpaper.title);
            setDescription(singleWallpaper.description);
            setCategory(singleWallpaper.category);
        }
    }, [singleWallpaper]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);

        if (imageFile) {
            formData.append("wallpaperImage", imageFile);
        }

        await editWallpaper(id, formData);
        navigate(`/elixir/wall/${id}`);
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

    if (isLoading || !singleWallpaper) {
        return <div className="text=center py-10 text-lg font-semibold">Loading...</div>;
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6 mt-16 pb-48 -mb-52">
            <h1 className="text-2xl font-bold mb-6 bg-gradient-to-l from-secondary to-primary text-transparent bg-clip-text transition-all duration-500 mt-10">Edit Wallpaper</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium">Title</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
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
                    <label className="block font-medium">Change Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input w-full"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Update Wallpaper
                </button>
            </form>
        </div>
    );
};

export default EditWallpaper;
