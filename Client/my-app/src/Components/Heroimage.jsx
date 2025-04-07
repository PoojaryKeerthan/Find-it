import React from 'react'
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";
import { useCallback } from "react";
import HeroIamge from '../Assets/Image.jpg'
const Heroimage = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadStarsPreset(engine);
    }, []);
    return (
        <div >
            <div className="absolute inset-0 -z-10">
                <Particles
                    width="100%"
                    height="500px"
                    // className="h-screen"
                    // divId="particles-js"
                    // style={{ position: "absolute" }}
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        preset: "stars",
                        fullScreen: { enable: false },
                        background: { color: "#000" },
                        particles: {
                            color: { value: "#ff69b4" },
                            move: {
                                enable: true,
                                speed: 2,
                            },
                        },
                    }}
                />
            </div>
            <div className="flex flex-col lg:flex-row">
                {/* Text Section */}
                <div className="z-10 px-4 lg:px-20 pt-8 text-center lg:text-left">
                    <h1 className="text-8xl sm:text-7xl lg:text-9xl font-extrabold mb-6 text-pink-600 font-sans leading-tight">
                        Find-It
                    </h1>
                    <p className="text-base sm:text-lg lg:text-2xl text-gray-300 max-w-3xl mx-auto lg:mx-0 mt-6">
                        Lost something? Found something? <br className="hidden lg:block" />
                        <span className="inline-block mt-2">
                            Find-It connects people to help reunite lost items with their owners.
                            Post, discover, and recover — all in one place.
                        </span>
                    </p>
                </div>
                    
                {/* Image Section — hidden on mobile */}
                <div className="hidden lg:mt-0 lg:w-1/2 lg:flex justify-center">
                    <img
                        src={HeroIamge}
                        alt="Lost and Found Illustration"
                        className="w-[350px] object-contain rounded-2xl shadow-xl relative top-10"
                    />
                </div>
            </div>
            <div className="flex justify-center gap-x-5">
            <button className="mt-6 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition hover:cursor-pointer">
             Add Lost-item
            </button>
            <button className="mt-6 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition hover:cursor-pointer">
             Add found-item
            </button>
          </div>
        </div>
    )
}

export default Heroimage