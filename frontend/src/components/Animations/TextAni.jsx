import React, { useEffect, useRef } from 'react';
import anime from "animejs"
import './anime.css';

const TextAni = () => {
    const text = "Elixir is where art comes alive — a vibrant space to showcase animated wallpapers, photography, and visual creations. Discover and download the latest trending wallpapers from every genre, crafted by a community of creators like you.";
    const textRef = useRef(null);

    useEffect(() => {
        anime({
            targets: '.split-char',
            translateY: ['0rem', '-1rem', '0rem'],
            loop: true,
            delay: anime.stagger(100),
            easing: 'easeInOutSine',
        });
    }, []);

    const splitText = text.split('').map((char, index) => (
        <span key={index} className="split-char">
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));

    return <p ref={textRef}>{splitText}</p>;
};

export default TextAni;
