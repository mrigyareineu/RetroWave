import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnniversaryVideo = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);

  const handleStart = () => {
    setHasStarted(true);
    // Brief delay ensures the video element is mounted before we trigger play
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 150);
  };

  return (
    <div className="relative h-full w-full bg-black overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {!hasStarted ? (
          /* --- THE SPLASH SCREEN --- */
          <motion.div
            key="start-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/anniversary-bg.png')",
              imageRendering: 'pixelated' 
            }}
          >
            {/* INVISIBLE BUTTON LAYER */}
            {/* This is positioned exactly over the pink 'START' button in your image */}
            <button
              onClick={handleStart}
              className="absolute w-[180px] h-[60px] translate-y-[105px] bg-transparent cursor-pointer hover:bg-white/10 rounded-xl transition-all"
              aria-label="Start Anniversary Video"
            >
              <span className="sr-only">Start</span>
            </button>
          </motion.div>
        ) : (
          /* --- THE VIDEO PLAYER --- */
          <motion.div
            key="video-player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex items-center justify-center bg-black"
          >
            <video
              ref={videoRef}
              className="max-w-full max-h-full"
              controls
              autoPlay
              playsInline
            >
              <source src="/videos/anniversary-vid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnniversaryVideo;