import React, { useEffect } from "react";

const SplineViewer2 = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://unpkg.com/@splinetool/viewer@1.10.48/build/spline-viewer.js";
        document.head.appendChild(script);
    }, []);

    return (
        <div className="spline-container">
            <spline-viewer
                url="https://prod.spline.design/zm3x3FL3WG9rnuG6/scene.splinecode"
                loading="lazy"
                style={{ width: "100%", height: "100%" }}
                render-frames="20"
                id="robot-3d"
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
                data-aos-offset="0" 
                data-aos-duration="1500"
            ></spline-viewer>
        </div>
    );
};

export default SplineViewer2;
