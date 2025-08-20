import React, { useState } from "react";

const ThreeDUser = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
    <div
        className="relative w-14 h-16 mx-auto group hover:scale-105 transition-transform duration-500 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      {/* Head */}
        <div className={`absolute top-5 left-1/2 w-5 h-5 rounded-full bg-gradient-to-t from-blue-500/70 via-blue-300/50 to-blue-200/50 border-[1px] border-blue-600 shadow-lg backdrop-blur-sm z-10 transform -translate-x-1/2 ${isHovered ? "animate-head-bounce" : ""}`}/>

      {/* Shoulders */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-9 h-5 rounded-full bg-gradient-to-t from-blue-500/70 via-blue-300/50 to-blue-200/50 border-[1px] border-blue-600 shadow-lg backdrop-blur-sm z-10" />

      {/* Glow */}
        <div className="absolute top-5 inset-0 rounded-full blur-md opacity-10 bg-blue-300 group-hover:opacity-30 transition duration-500" />
    </div>
    );
};

export default ThreeDUser;
