import React, { useRef } from 'react';
import { gsap } from 'gsap';

const shapes = ['∅', 'आ', '♪', 'a', '$'];

const PartyTrigger = ({ children }) => {
    const containerRef = useRef(null);

    const handleHover = (e) => {
        const container = containerRef.current;

        for (let i = 0; i < 12; i++) {
            const shape = document.createElement('div');
            shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            shape.className = 'absolute text-xl pointer-events-none z-30';
            shape.style.left = `${e.nativeEvent.offsetX}px`;
            shape.style.top = `${e.nativeEvent.offsetY}px`;
            container.appendChild(shape);

            const angle = Math.random() * Math.PI * 2;
            const distance = 60 + Math.random() * 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            gsap.to(shape, {
                x,
                y,
                opacity: 0,
                rotation: Math.random() * 360,
                scale: 0.8 + Math.random(),
                duration: 1.2 + Math.random(),
                ease: 'power2.out',
                onComplete: () => shape.remove(),
            });
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative inline-block w-fit"
            onMouseEnter={handleHover}
        >
            {children}
        </div>
    );
};

export default PartyTrigger;
