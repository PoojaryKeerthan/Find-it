import React from 'react'
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";
import { useCallback } from "react";

const Heroimage = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadStarsPreset(engine);
      }, []);
  return (
    <div className='' >
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
    <div className="z-10 text-center px-4 pt-8">
        <h1 className="text-8xl sm:text-6xl font-bold mb-4 text-pink-600 font-sans lg:text-left lg:text-9xl">Find-It </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto mt-10 lg:text-left relative lg:right-113">
        Lost something? Found something?
        Find-It connects people to help reunite lost items with their owners. Post, discover, and recover — all in one place
        </p>
      </div>
    </div>
  )
}

export default Heroimage