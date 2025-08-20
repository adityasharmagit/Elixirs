import React, { useEffect } from 'react'
import './landing.css';
import { FlaskRound } from 'lucide-react';
import SplineViewer2 from '../components/design/SplineViewer2';
import { Link } from 'react-router-dom';
import PartyTrigger from '../components/Animations/PartyTrigger';
import TextAni from '../components/Animations/TextAni';

const LandingPage = () => {
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div id='landing-page'>
            <img id="image-gradient" src="gradient.png" alt="gradient" />
            <div id='layer-blue'></div>

            <div id='container'>
                <header id='header'>
                    <h1 data-aos="fade-down" data-aos-duration="1500" id="logo">ELIXIR</h1>

                    <nav id='nav'>
                        <span data-aos="fade-down" data-aos-duration="1500"><Link to="/">GALLERY</Link></span>
                        <span data-aos="fade-down" data-aos-duration="2000"><Link to="/elixir/create">DROP YOUR VIBE</Link></span>
                        <span data-aos="fade-down" data-aos-duration="3000"><Link to="/about">DOC</Link></span>
                    </nav>

                    <button data-aos="fade-down" data-aos-duration="1500" id="btn-signing"><Link to="/login">SIGNING</Link></button>
                </header>
                <main id='main'>
                    <div id="content">
                        <div data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="300"
                        data-aos-offset="0" data-aos-duration="1500" id="tag-box">
                            <div id="tag">INIRUCING <FlaskRound size={15} className='ml-1 mt-[2px]'/></div>
                        </div>

                        <h1 data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="300"
                        data-aos-offset="0" data-aos-duration="2000" ><span className='text-flicker-in-glow'>Evoking<br/>Essence Anew</span></h1>

                        <p data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="300"
                        data-aos-offset="0" data-aos-duration="2500" id="description">
                            Discover AI-generated and hand-curated wallpapers that reflect your mood, style, and imagination.
                        </p>

                        <div data-aos="fade-zoom-in"
                        className='mb-10'
                        data-aos-easing="ease-in-back"
                        data-aos-delay="300"
                        data-aos-offset="0" data-aos-duration="3000" id="buttons">
                            <PartyTrigger>
                                <a id="btn-get-started"><Link to="/about">Documentation &gt;</Link></a>
                            </PartyTrigger>
                            <PartyTrigger>
                                <a id="btn-signing-main"><Link to="/">Getstarted &gt;</Link></a>
                            </PartyTrigger>
                        </div>
                    </div>
                </main>
                <SplineViewer2/>
            </div>
            <section className="min-h-screen text-white items-center justify-center px-4 hidden md:flex">
                <div className="text-center max-w-7xl">
                    <TextAni/>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
