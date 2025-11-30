import React, { useEffect } from "react";

const SplineViewer = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://unpkg.com/@splinetool/viewer@1.12.5/build/spline-viewer.js";
        document.head.appendChild(script);
    }, []);

    return (
        <div className="w-full h-[800px] mt-10 spline-container">
            <spline-viewer
                url="https://prod.spline.design/BUA9zKNAwitI2jtV/scene.splinecode"
                loading="lazy"
                style={{ width: "100%", height: "100%"}}
                render-frames="20"
            ></spline-viewer>
        </div>
    );
};

export default SplineViewer;

