import React, { useEffect } from "react";
import { Star, Rocket, Box } from "lucide-react";

const About = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="max-w-4xl mt-8 mx-auto px-6 py-16 text-start -mb-36">
            <h1 className="text-4xl py-4 font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text mb-6">
                About Elixir Gallery
            </h1>
            <p className="text-lg text-gray-500 mb-8">
                Welcome to <span className="text-primary font-semibold text-flicker-in-glow">Elixir</span> — a place where pixels meet personality. Whether you're into anime, nature, tech, or minimal aesthetics, we bring you stunning wallpapers curated for every taste.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                    <h2 className="inline-flex gap-2 text-xl font-semibold mb-2 text-primary">
                        <div>
                            <Star size={14} className="mr-3 animate-spin" style={{ animationDuration: '3s' }}/> <Star size={10} className="mr-4 animate-spin" style={{ animationDuration: '2s' }}/> <Star size={12} className="ml-3 -mt-4 animate-spin" style={{ animationDuration: '3s' }}/>
                        </div> What We Offer</h2>
                    <ul className="list-disc pl-5 text-gray-500 space-y-2">
                        <li>High-resolution, curated wallpapers</li>
                        <li>Multiple aesthetic categories</li>
                        <li>User submissions and ratings</li>
                        <li>Fast, responsive gallery experience</li>
                    </ul>
                </div>
                <div>
                    <h2 className="inline-flex gap-2 text-xl font-semibold mb-2 text-primary"><Rocket size={16} className="mt-2 animate-bounce" style={{ animationDuration: '2s' }}/> Our Mission</h2>
                    <p className="text-gray-500">
                        We believe your screen deserves to look as bold as your personality. Elixir is more than just a wallpaper site — it's a creative space where visuals inspire mood, creativity, and expression.
                    </p>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="inline-flex gap-2 text-xl font-semibold text-primary mb-2">
                    <div className="-rotate-12">
                        <Box size={16} className="mr-2 animate-bounce" style={{ animationDuration: '3s' }}/> <Box size={12} className="mr-4 animate-bounce" style={{ animationDuration: '2s' }}/> <Box size={14} className="ml-3 -mt-4 animate-bounce" style={{ animationDuration: '4s' }}/>
                    </div> Who Made This?</h2>
                <p className="text-gray-500">
                    Crafted with passion by <span className="text-primary font-semibold text-flicker-in-glow">Aditya</span> — a solo creator with a love for clean design and digital art. Want to contribute? Reach out or share your creation in the gallery.
                </p>
            </div>
        </div>
    );
};

export default About;
