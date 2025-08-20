import React from 'react';
import { Link } from 'react-router-dom';
import PolygonMorph from '../components/Animations/PolygonMorph';
import NotFoundImage from '/gradient.png';

const NotFound = () => {
    return (
        <div className="relative flex items-center justify-center h-screen text-white -mb-60">
        {/* Background Image */}
        <img 
            src={NotFoundImage} 
            alt="Not Found Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-70"
        />

        {/* Overlay (text + polygon) */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
            <h1 className="inline-flex text-7xl font-bold mb-4">
                4<PolygonMorph/>4
            </h1>
            <p className="text-xl mb-6">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-full text-lg font-semibold"
            >
            Go Back Home
            </Link>
        </div>

        {/* Optional dark overlay for readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </div>
    );
};

export default NotFound;
