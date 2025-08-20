import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Info, Unplug, Navigation, HeartIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const headingRef = useRef(null);

    useEffect(() => {
        const el = headingRef.current;
        ScrollTrigger.create({
            trigger: document.body,
            start: 'bottom bottom',
            onEnter: () => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 0 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        onComplete: () => {
                            el.classList.add("text-flicker-in-glow");
                        }
                    }
                );
            },
        });
    }, []);

    return (
        <footer className="bg-base-200 text-base-content py-10 border-t border-primary/30 mt-60">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 ref={headingRef} className="text-xl font-bold text-primary opacity-0">Elixir's</h2>
                    <p className="mt-2 text-sm">
                        Discover stunning wallpapers curated for every taste, from 
                        <span className="hover:text-accent" style={{
                            textShadow: "0 0 10px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.3)"
                        }}> anime </span> 
                        to
                        <span className="hover:text-secondary" style={{
                            textShadow: "0 0 10px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.3)"
                        }}> abstract </span>.
                    </p>
                </div>

                <div>
                    <h3 className="inline-flex item-center gap-1 text-md font-semibold mb-2 text-primary">Connect <Unplug size={12} className='mt-2 animate-pulse'/></h3>
                    <ul className="text-sm space-y-1">
                        <li><a href="https://github.com/adityasharmagit" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent"><Github size={12}/> GitHub</a></li>
                        <li><a href="mailto:ofcourlake@gmail.com" className="inline-flex items-center gap-1 hover:text-accent"><Mail size={12}/> Email Us</a></li>
                        <li><Link to="/about" className="inline-flex items-center gap-1 hover:text-accent"><Info size={12}/> About</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h3 className="inline-flex item-center gap-1 text-md font-semibold mb-2 text-primary">Navigate <Navigation size={10} className='mt-2 animate-pulse'/></h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="inline-flex items-center gap-1 hover:text-accent">Gallery</Link></li>
                        <li className='hidden md:inline-flex'><Link to="/landing" className="inline-flex items-center gap-1 hover:text-accent">Elixir's</Link></li>
                        <li><Link to="/profile" className="inline-flex items-center gap-1 hover:text-accent">Profile</Link></li>
                        <li><Link to="/elixir/create" className="inline-flex items-center gap-1 hover:text-accent">Add Your Vibe</Link></li>
                    </ul>
                </div>
            </div>

            <div className='text-center mt-10'>
                <p className="inline-flex text-xs text-gray-500">
                    Built with <HeartIcon size={12} className='mt-[2px] mx-1 text-primary animate-bounce'/> using MERN Stack & DaisyUI
                </p>
            </div>

            <div className="text-center -mt-1 text-sm text-gray-500">
                © {new Date().getFullYear()} <span className="hover:text-secondary" style={{
                    textShadow: "0 0 10px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.3)"
                }}> Elixir's</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
