import React, { useEffect, useRef } from "react";
import anime from "animejs";
import * as flubber from "flubber";
import "./anime.css";

const PolygonMorph = () => {
    const pathRef = useRef(null);

    useEffect(() => {
        const start = "M152,4 L170,38 L204,56 L170,74 L152,108 L134,74 L100,56 L134,38 Z";
        const end = generateRandomPath();

        function generateRandomPath() {
            const total = Math.floor(Math.random() * (64 - 4) + 4);
            const r1 = Math.floor(Math.random() * (56 - 4) + 4);
            const r2 = 56;
            const isOdd = (n) => n % 2;
            let points = [];

            for (let i = 0, l = isOdd(total) ? total + 1 : total; i < l; i++) {
                const r = isOdd(i) ? r1 : r2;
                const a = (2 * Math.PI * i) / l - Math.PI / 2;
                const x = 152 + Math.round(r * Math.cos(a));
                const y = 56 + Math.round(r * Math.sin(a));
                points.push([x, y]);
            }

            return `M${points.map(([x, y]) => `${x},${y}`).join(" L")} Z`;
        }

    function loopMorph() {
        const to = generateRandomPath();
        const interpolator = flubber.interpolate(startPath.current, to);

        anime({
            targets: { progress: 0 },
            progress: 1,
            duration: 1000,
            easing: "easeInOutQuad",
            update: (anim) => {
                const newPath = interpolator(anim.animations[0].currentValue);
                if (pathRef.current) pathRef.current.setAttribute("d", newPath);
            },
            complete: () => {
                startPath.current = to;
                loopMorph(); // Repeat with new target
            },
        });
    }

        const startPath = { current: start };
        pathRef.current.setAttribute("d", start);
        loopMorph();
    }, []);

    return (
        <svg viewBox="0 0 304 112" width="204" height="50" id="svg-morph">
            <path
                ref={pathRef}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default PolygonMorph;
