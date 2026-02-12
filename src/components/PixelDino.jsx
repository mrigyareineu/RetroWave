// // import React, { useEffect, useRef, useState } from 'react';
// // import confetti from 'canvas-confetti';

// // const PixelDino = () => {
// //   const canvasRef = useRef(null);
// //   const [score, setScore] = useState(0);
// //   const [highScore, setHighScore] = useState(localStorage.getItem('dinoHighScore') || 0);
// //   const [gameState, setGameState] = useState('START');

// //   // We use a ref for the dino so the game loop can access it without causing re-renders
// //   const dinoRef = useRef({ x: 50, y: 150, width: 40, height: 40, dy: 0, jumping: false });
// //   const obstaclesRef = useRef([]);
// //   const frameCountRef = useRef(0);

// //   const jump = () => {
// //     if (!dinoRef.current.jumping) {
// //       dinoRef.current.dy = -12; // Jump Strength
// //       dinoRef.current.jumping = true;
// //     }
// //   };

// //   useEffect(() => {
// //     if (gameState !== 'PLAYING') return;

// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext('2d');
// //     let animationFrameId;
    
// //     const gravity = 0.6;
// //     const anniversaryGoal = 2192;
// //     let gameSpeed = 5;

// //     const gameLoop = () => {
// //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// //       const dino = dinoRef.current;

// //       // 🦖 Dino Physics
// //       if (dino.jumping) {
// //         dino.dy += gravity;
// //         dino.y += dino.dy;
// //         if (dino.y > 150) {
// //           dino.y = 150;
// //           dino.jumping = false;
// //           dino.dy = 0;
// //         }
// //       }

// //       // 🌵 Obstacle Logic (Spawning)
// //       if (frameCountRef.current % 100 === 0) {
// //         obstaclesRef.current.push({ x: canvas.width, y: 160, width: 20, height: 30 });
// //       }

// //       // Move and Draw Obstacles
// //       obstaclesRef.current.forEach((obs, index) => {
// //         obs.x -= gameSpeed;
        
// //         // Collision Detection
// //         if (
// //           dino.x < obs.x + obs.width &&
// //           dino.x + dino.width > obs.x &&
// //           dino.y < obs.y + obs.height &&
// //           dino.y + dino.height > obs.y
// //         ) {
// //           setGameState('GAMEOVER');
// //           if (score > highScore) {
// //             setHighScore(score);
// //             localStorage.setItem('dinoHighScore', score);
// //           }
// //         }

// //         ctx.fillStyle = '#1a2e05'; 
// //         ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
// //       });

// //       // 🦕 Draw Dino
// //       ctx.fillStyle = '#2d5a27';
// //       ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

// //       // Cleanup off-screen obstacles
// //       obstaclesRef.current = obstaclesRef.current.filter(obs => obs.x > -50);

// //       // Score logic
// //       setScore(s => {
// //         if (s === anniversaryGoal) {
// //           confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
// //         }
// //         return s + 1;
// //       });

// //       frameCountRef.current++;
// //       gameSpeed += 0.001;
// //       animationFrameId = requestAnimationFrame(gameLoop);
// //     };

// //     gameLoop();
// //     return () => cancelAnimationFrame(animationFrameId);
// //   }, [gameState]);

// //   // Handle Keyboard Inputs
// //   useEffect(() => {
// //     const handleKeyDown = (e) => {
// //       if (e.code === 'Space' || e.code === 'ArrowUp') {
// //         e.preventDefault();
// //         if (gameState === 'PLAYING') jump();
// //         else startNewGame();
// //       }
// //     };
// //     window.addEventListener('keydown', handleKeyDown);
// //     return () => window.removeEventListener('keydown', handleKeyDown);
// //   }, [gameState]);

// //   const startNewGame = () => {
// //     setScore(0);
// //     obstaclesRef.current = [];
// //     frameCountRef.current = 0;
// //     dinoRef.current = { x: 50, y: 150, width: 40, height: 40, dy: 0, jumping: false };
// //     setGameState('PLAYING');
// //   };

// //   return (
// //     <div 
// //       className="h-full w-full bg-[#9bbc0f] flex flex-col items-center justify-center p-4 font-mono select-none" 
// //       onMouseDown={() => gameState === 'PLAYING' ? jump() : startNewGame()}
// //     >
// //       <div className="border-8 border-[#8b9b59] p-2 bg-[#8da04e] shadow-inner relative w-full max-w-[600px]">
// //         <div className="absolute top-2 right-4 text-[#1a2e05] text-xs font-bold z-10">
// //           HI {String(highScore).padStart(5, '0')} | {String(score).padStart(5, '0')}
// //         </div>
        
// //         <canvas ref={canvasRef} width={600} height={200} className="w-full h-auto block" />
        
// //         {gameState !== 'PLAYING' && (
// //           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 text-[#1a2e05] z-20">
// //             <p className="text-xl font-bold animate-pulse">
// //               {gameState === 'START' ? 'PRESS SPACE TO START' : 'GAME OVER'}
// //             </p>
// //             {gameState === 'GAMEOVER' && <p className="text-sm mt-2">Click or Space to Retry</p>}
// //             {score >= 2192 && <p className="mt-4 text-lg">❤️ Happy 6 Years! ❤️</p>}
// //           </div>
// //         )}
// //       </div>

// //       {/* Game Boy Buttons Decoration */}
// //       <div className="mt-6 flex gap-12 items-center opacity-30">
// //         <div className="text-4xl text-[#1a2e05]">✚</div>
// //         <div className="flex gap-4">
// //           <div className="w-10 h-10 rounded-full bg-[#1a2e05]" />
// //           <div className="w-10 h-10 rounded-full bg-[#1a2e05]" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PixelDino;

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const TASKS = [
//   "Message: You are so cutuuuu.",
//   "Message: I love you sss sss much.",
//   "Message: Please learn how to drive",
//   "Message: Everything is better with you",
//   "Messege: I wish to spend eternity w you.",
//   "Message: Give me 6 hugs when you see me next!"
// ];

// const MinecraftRoom = () => {
//   const [activeTask, setActiveTask] = useState(null);

//   const handleLanternClick = () => {
//     // 1. Pick a random task
//     const randomTask = TASKS[Math.floor(Math.random() * TASKS.length)];
//     setActiveTask(randomTask);

//     // 2. Music logic would go here (e.g., play a random track)
//     console.log("Playing a lo-fi track...");
//   };

//   return (
//     <div 
//       className="relative h-full w-full overflow-hidden bg-cover bg-center"
//       style={{ backgroundImage: "url('/cherry-grove.png')", imageRendering: 'pixelated' }}
//     >
//       {/* 🏮 HANGING LANTERNS */}
//       <div className="absolute inset-0 flex justify-around items-start pt-10 px-20 pointer-events-none">
//         {[1, 2, 3, 4, 5, 6].map((i) => (
//           <motion.div
//             key={i}
//             className="pointer-events-auto cursor-pointer"
//             animate={{ rotate: [0, 6, 0, -6, 0] }}
//             transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
//             onClick={handleLanternClick}
//           >
//             {/* The "Chain" */}
//             <div className="w-1 h-12 bg-gray-800 mx-auto" />
//             {/* The Lantern Emoji or Image */}
//             <div className="text-4xl drop-shadow-[0_0_10px_rgba(255,200,0,0.8)]">🏮</div>
//           </motion.div>
//         ))}
//       </div>

//       {/* 📦 MINECRAFT GUI CARD */}
//       <AnimatePresence>
//         {activeTask && (
//           <motion.div 
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0, opacity: 0 }}
//             className="absolute inset-0 flex items-center justify-center bg-black/40 z-50 p-4"
//             onClick={() => setActiveTask(null)}
//           >
//             <div 
//               className="bg-[#c6c6c6] border-t-4 border-l-4 border-white border-b-4 border-r-4 border-[#555555] p-6 shadow-2xl max-w-sm w-full"
//               style={{ boxShadow: "inset -4px -4px #555555, inset 4px 4px #ffffff" }}
//             >
//               <h4 className="text-[#373737] font-bold mb-4 uppercase tracking-tighter">Anniversary Quest</h4>
//               <p className="text-[#373737] font-medium leading-relaxed bg-[#8b8b8b]/10 p-4 border-2 border-[#555555]">
//                 {activeTask}
//               </p>
//               <button 
//                 className="mt-6 w-full bg-[#8b8b8b] border-2 border-[#555555] py-2 text-white hover:bg-green-700 transition-colors uppercase text-sm"
//               >
//                 Close Inventory
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default MinecraftRoom;


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const TASKS = [
  "Message: You are so cutuuuu.",
  "Message: I love you sss sss much.",
  "Message: Please learn how to drive",
  "Message: Everything is better with you",
  "Messege: I wish to spend eternity w you.",
  "Message: Give me 6 hugs when you see me next!"
];

const MinecraftRoom = () => {
  const [activeTask, setActiveTask] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const soundRef = useRef(null);

  // Initialize Howler music
  useEffect(() => {
    // We check if window.Howl is available from your script tag in RetroWaveApp
    if (window.Howl) {
      soundRef.current = new window.Howl({
        src: ['/sounds/minecraft.mp3'],
        html5: true, // Better for longer music files
        loop: true,
        volume: 0.5,
      });
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
    };
  }, []);

  const handleStartSystem = () => {
    setIsStarted(true);
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  const handleLanternClick = () => {
    const randomTask = TASKS[Math.floor(Math.random() * TASKS.length)];
    setActiveTask(randomTask);
  };

  return (
    <div 
      className="relative h-full w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/cherry-grove.png')", imageRendering: 'pixelated' }}
    >
      {/* 🖱️ START BUTTON (The hellooo button) */}
      <AnimatePresence>
        {!isStarted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.5 } }}
            className="absolute inset-0 flex items-center justify-center z-[60] bg-black/40 backdrop-blur-sm"
          >
            <button 
              onClick={handleStartSystem}
              className="bg-[#c6c6c6] border-t-4 border-l-4 border-white border-b-4 border-r-4 border-[#555555] px-12 py-6 shadow-2xl active:translate-y-1 active:shadow-none transition-all"
              style={{ boxShadow: "inset -4px -4px #555555, inset 4px 4px #ffffff" }}
            >
              <h2 className="text-[#373737] text-4xl font-bold tracking-tighter uppercase font-mono hover:text-green-700">
                hellooo
              </h2>
              <p className="text-[#555555] text-[10px] mt-2 font-mono uppercase tracking-widest opacity-60">
                Click to enter our world
              </p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🏮 LANTERNS (Only show after clicking start) */}
      <AnimatePresence>
        {isStarted && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex justify-around items-start pt-10 px-20 pointer-events-none"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="pointer-events-auto cursor-pointer"
                animate={{ rotate: [0, 6, 0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 + i, ease: "easeInOut" }}
                onClick={handleLanternClick}
              >
                <div className="w-1 h-12 bg-gray-800/80 mx-auto" />
                <div className="text-5xl drop-shadow-[0_0_15px_rgba(255,200,0,0.6)]">🏮</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📦 MINECRAFT GUI CARD */}
      <AnimatePresence>
        {activeTask && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 z-50 p-4"
            onClick={() => setActiveTask(null)}
          >
            <div 
              className="bg-[#c6c6c6] border-t-4 border-l-4 border-white border-b-4 border-r-4 border-[#555555] p-6 shadow-2xl max-w-sm w-full"
              style={{ boxShadow: "inset -4px -4px #555555, inset 4px 4px #ffffff" }}
            >
              <h4 className="text-[#373737] font-bold mb-4 uppercase tracking-tighter text-xs opacity-50">
                Relationship Log
              </h4>
              <p className="text-[#373737] font-medium leading-relaxed bg-[#8b8b8b]/20 p-4 border-2 border-[#555555] font-mono">
                {activeTask}
              </p>
              <button 
                className="mt-6 w-full bg-[#8b8b8b] border-2 border-b-4 border-r-4 border-[#555555] py-2 text-white hover:bg-green-700 transition-colors uppercase text-xs font-bold"
              >
                Close Log
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MinecraftRoom;