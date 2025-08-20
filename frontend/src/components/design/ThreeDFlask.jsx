import React from "react";

const ThreeDFlaskRound = () => {
    return (
    <div
        className="relative size-12 mb-2 transition-transform duration-500 ease-in-out
                    hover:animate-flask-tilt"
    >
      {/* Flask Neck */}
        <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[13px] h-1 bg-white/20 border-[1.2px] border-orange-400 rounded-sm z-10 shadow-inner backdrop-blur-sm"/>
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[13px] h-1 bg-white/20 border-[1.2px] border-orange-400 rounded-sm z-10 shadow-inner backdrop-blur-sm"/>
        <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-[16px] h-1 bg-white/20 border-[1.2px] border-orange-400 rounded-sm z-10 shadow-inner backdrop-blur-sm"/>

      {/* Flask Shoulder */}
        <div className="absolute top-[5.1px] left-1/2 -translate-x-1/2 w-3 h-4 bg-orange-300/30 border-x-[1px] border-t-[1px] border-orange-400 rounded-t-[20%] z-10 rotate-180" />

      {/* Flask Round Body */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-10 h-8 bg-orange-300/30 border-[1px] border-orange-400 rounded-full shadow-xl overflow-hidden backdrop-blur-sm">
        {/* Liquid */}
        <div className="absolute -bottom-1 w-52 h-[65%] bg-yellow-500/90 rounded-b-full animate-pulse hover:h-[75%] transition-all duration-500" />

        {/* Bubbles */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col gap-1 animate-bubble-rise z-10">
            <div className="w-2 h-2 bg-white/50 rounded-full shadow" />
            <div className="w-1 h-1 bg-white/60 rounded-full shadow ml-2" />
            <div className="w-1.5 h-1.5 bg-white/70 rounded-full shadow" />
        </div>
        <div className="absolute bottom-4 left-1/4 -translate-x-1/4 flex flex-col gap-1 animate-bubble-rise z-10">
            <div className="w-2 h-2 bg-white/50 rounded-full shadow mt-3 ml-2" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full shadow mr-1" />
            <div className="w-1 h-1 bg-white/60 rounded-full shadow ml-1" />
        </div>
            <div className="w-1 h-1 bg-white/50 rounded-full shadow mt-5 ml-7" />
            <div className="w-1 h-1 bg-white/60 rounded-full shadow mb-3 ml-3" />
        </div>

        {/* Glow effect */}
        <div className="absolute top-2 inset-0 rounded-full blur-md opacity-20 bg-orange-400 group-hover:opacity-40 transition duration-500" />
    </div>
    );
};

export default ThreeDFlaskRound;
