import React, { useEffect } from "react";

import Navbar from "./components/include/Navbar";
import Footer from "./components/include/Footer";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ShowWallpaper from "./components/include/ShowWallpaper";
import UploadWall from "./components/include/UploadWall";
import EditWallpaper from "./components/include/EditWallpaper";
import About from "./pages/AboutPage";
import Landing from "./pages/LandingPage";
import AOS from "aos";
import "aos/dist/aos.css";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

import { Loader } from "lucide-react";

import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import GlitterCursor from "./components/design/GlitterCursor";
import NotFound from "./pages/NotFound";

const App = () => {
  const { authUser, checkAuth, isCheckAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const location = useLocation();
  const hideNavBar = location.pathname === "/landing";
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});


  if(isCheckAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  

  return (
    <div data-theme={theme}>
      {!hideNavBar && <Navbar/>}
      <GlitterCursor/>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/landing" element={<Landing/>}/>
        <Route path="/about" element={<About/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/" />}/>
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />}/>
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login" />} />
        <Route path="/elixir/wall/:id" element={<ShowWallpaper />}/>
        <Route path="/elixir/create" element={authUser ? <UploadWall/> : <Navigate to="/" />}/>
        <Route path="/elixir/edit/:id" element={authUser ? <EditWallpaper/> : <Navigate to="/" />}/>

        {/* Catch-all 404 route */}
        <Route path="*" element={<NotFound />}/>
      </Routes>

      <Footer/>
      <Toaster/>
    </div>
  );
};

export default App;