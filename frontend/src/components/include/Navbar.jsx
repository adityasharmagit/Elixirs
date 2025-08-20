import React, { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { LogOut, FlaskRound, Moon, Key, Sun, PlusCircle } from "lucide-react";
import {THEMES} from "../../constants/theme.js";
import {useThemeStore} from "../../store/useThemeStore.js";
import vid from "/Logo.webm";
import ThreeDFlask from "../design/ThreeDFlask.jsx";

const Navbar = () => {
    const {logout, authUser} = useAuthStore();
    const { theme, setTheme } = useThemeStore();
    const videoRef = useRef(null);
    useEffect(() => {
      const video = videoRef.current;

      const handleEnded = () => {
        setTimeout(() => {
          if(video) {
            video.play();
          }
        }, 3000);
      };
      if(video) {
        video.addEventListener("ended", handleEnded);
      }
      return () => {
        if (video) {
          video.removeEventListener("ended", handleEnded);
        }
      };
    }, []);

    return (
        <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                                <ThreeDFlask />
                                <div className="relative h-12 w-28">
                                  <video
                                    ref={videoRef}
                                    src={vid}
                                    className="h-12 w-28 rounded-full"
                                    autoPlay
                                    muted
                                    playsInline
                                    disablePictureInPicture
                                    controlsList="nodownload nofullscreen noremoteplayback"
                                    data-aos="fade-down"
                                    data-aos-delay="350"
                                  />
                                </div>
                        </Link>
                    </div>
                    
                    <div className="flex items-center gap-2">

                        {authUser && (
                            <>
                              <div className="relative group mr-2" data-aos="fade-down" data-aos-delay="300">
                                <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  Upload
                                </span>
                                <Link to="/elixir/create" className={`gap-2 group rounded-full`}>
                                    <PlusCircle className="size-6 transition-transform group-hover:rotate-90 duration-200"/>
                                </Link>
                              </div>

                              <div className="relative group" data-aos="fade-down" data-aos-delay="400">
                                <span className="absolute top-14 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  Profile
                                </span>
                                <Link to={"/profile"} className={`group rounded-full`}>
                                    <img 
                                      src={authUser.profilePic || "/avatar.png"} 
                                      alt=""
                                      className="size-10 rounded-full object-cover border-4 transition-transform group-hover:animate-bounce duration-100" 
                                    />
                                </Link>
                              </div>
                            </>
                        )}
                        <div className="dropdown dropdown-end" data-aos="fade-down" data-aos-delay="500">
                          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle group relative">
                            <Sun className="w-5 h-5 transition-all duration-200 group-hover:opacity-0 group-hover:rotate-45 absolute" />
                            <Moon className="w-4 h-4 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:-rotate-12" />
                          </div>

                          <div
                            tabIndex={0}
                            className="dropdown-content z-[999] mt-4 w-72 max-w-[90vw] p-4 shadow bg-base-100 rounded-box"
                          >
                            <div className="grid grid-cols-4 gap-2 max-h-80 overflow-y-auto">
                              {THEMES.map((t) => (
                                <button
                                  key={t}
                                  className={`
                                    group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                                    ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                                  `}
                                  onClick={() => {
                                    setTheme(t);
                                    document.documentElement.setAttribute("data-theme", t);
                                  }}
                                >
                                  <div
                                    className="relative h-4 w-full rounded-md overflow-hidden"
                                    data-theme={t}
                                  >
                                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                                      <div className="rounded bg-primary"></div>
                                      <div className="rounded bg-secondary"></div>
                                      <div className="rounded bg-accent"></div>
                                      <div className="rounded bg-neutral"></div>
                                    </div>
                                  </div>
                                
                                  <span className="text-[11px] font-medium truncate w-full text-center">
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {!authUser && (
                          <div className="relative group">
                            <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              Login
                            </span>
                            <Link to="/login" className="gap-2 transition-colors" data-aos="fade-down" data-aos-delay="600">
                              <Key className="w-4 h-4 transition items-center hover:rotate-45"/>
                            </Link>
                          </div>
                        )}

                        {authUser && (
                            <>
                                <button className="flex gap-2 transition items-center hover:-rotate-6 hover:scale-90 hover:text-red-500" onClick={logout}>
                                    <LogOut className="size-5" data-aos="fade-down" data-aos-delay="300"/>
                                    <span className="hidden sm:inline" data-aos="fade-down" data-aos-delay="300">Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar