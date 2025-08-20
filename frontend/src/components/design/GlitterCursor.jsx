// GlitterCursor.jsx
import React, { useEffect, useState } from 'react';

const GlitterCursor = () => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
    const handleMove = (e) => {
        setCoords({ x: e.clientX, y: e.clientY });
        setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseleave', handleLeave);
    };
    }, []);

    return (
    <div
        className={`fixed -top-2 -left-2 w-4 h-4 pointer-events-none z-[9999] transition-opacity duration-300 ease-in-out spline-container ${
            visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
            transform: `translate(${coords.x}px, ${coords.y}px)`,
        }}
    >
        <div className="w-full h-full rounded-full glitter-shimmer" />
    </div>
    );
};

export default GlitterCursor;
