import { Link } from "react-router-dom";

const WallpaperCard = ({ wall }) => {
    return (
        <Link
            to={`/elixir/wall/${wall._id}`}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
        >
        <div className="aspect-[4/3] overflow-hidden">
            <img
                src={wall.image?.url}
                alt={wall.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
        </div>

        <div className="p-4">
            <h2 className="text-lg font-semibold truncate">
                {wall.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Reviews:{" "}
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {wall.reviews?.length || 0}
            </span>
            </p>
        </div>
    </Link>
    );
};

export default WallpaperCard;
