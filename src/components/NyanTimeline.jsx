// import React from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';

// const memories = [
//   { year: '2019', text: 'Where it all began...', img: '/memories/start.jpg' },
//   { year: '2021', text: 'Our first big trip.', img: '/memories/trip.jpg' },
//   { year: '2023', text: 'Moved into our new space.', img: '/memories/house.jpg' },
//   { year: '2025', text: '6 Years and counting.', img: '/memories/now.jpg' },
// ];

// const NyanTimeline = () => {
//   const containerRef = React.useRef(null);

//   // Track scroll progress of this specific window
//   const { scrollXProgress } = useScroll({
//     container: containerRef
//   });

//   // Parallax: Background stars move slower than cards
//   const starsX = useTransform(scrollXProgress, [0, 1], ["0%", "-20%"]);

//   return (
//     <div className="relative h-full w-full bg-[#003366] overflow-hidden font-mono">
//       {/* Moving Star Background */}
//       <motion.div
//         style={{ x: starsX }}
//         className="absolute inset-0 opacity-30 pointer-events-none"
//       >
//         <div className="flex w-[200%] h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
//       </motion.div>

//       {/* The Nyan Cat (Fixed Position) */}
//       <div className="absolute left-10 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
//         <img src="/cat.png" alt="Nyan" className="w-24 h-auto animate-bounce" />
//       </div>

//       {/* Horizontal Scroll Area */}
//       <div
//         ref={containerRef}
//         className="flex h-full overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scrollbar-hide px-[150px] items-center gap-20"
//       >
//         {memories.map((m, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//             className="snap-center flex-shrink-0 w-[400px] bg-white/10 backdrop-blur-md border-2 border-white/20 p-6 rounded-xl text-white"
//           >
//             <div className="text-4xl font-black mb-4 text-pink-400">{m.year}</div>
//             <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden">
//                {/* Replace with actual memory photos */}
//                <div className="flex items-center justify-center h-full text-white/30 italic">Photo Entry {i + 1}</div>
//             </div>
//             <p className="text-lg leading-relaxed">{m.text}</p>
//           </motion.div>
//         ))}

//         {/* End Cap */}
//         <div className="flex-shrink-0 w-[200px] text-pink-500 font-bold text-2xl">
//           To be continued...
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NyanTimeline;

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const memories = [
  { year: "2019", text: "Where it all began..." },
  //    {
  //     year: "2019",
  //     text: "Where it all began...",
  //     img: "/memories/2019.jpg",
  //   },
  { year: "2021", text: "Our first big trip." },
  { year: "2023", text: "Moved into our new space." },
  { year: "2025", text: "6 years and counting." },
];

const NyanTimeline = () => {
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  /* 🎵 MUSIC */
  useEffect(() => {
    audioRef.current = new Audio("/sounds/nyan-cat.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play(); // 👈 important
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.log("Audio blocked by browser:", err);
    }
  };

  /* 📜 SCROLL ANIMATIONS */
  const { scrollXProgress } = useScroll({ container: containerRef });
  const starsX = useTransform(scrollXProgress, [0, 1], ["0%", "-30%"]);
  const rainbowWidth = useTransform(scrollXProgress, [0, 1], ["0%", "90%"]);

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#001c33] to-[#003366] overflow-hidden font-mono">
      {/* ⭐ STAR FIELD */}
      <motion.div
        style={{ x: starsX }}
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
      >
        <div
          className="w-[200%] h-full"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 0)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* 🐱 NYAN CAT */}
      <div
        className="absolute left-10 top-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        onClick={toggleMusic}
      >
        <div className="absolute -top-10 left-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          {isPlaying ? "Pause music" : "Play music 🎵"}
        </div>
        <div className="absolute -bottom-6 left-0 text-xs text-white/70">
          {isPlaying ? "🔊 Music On" : "🔇 Music Off"}
        </div>

        <motion.img
          src="/cat.png"
          alt="Nyan Cat"
          animate={isPlaying ? { y: [0, -6, 0] } : {}}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="w-28 select-none"
        />

        {/* 🌈 RAINBOW */}
        <motion.div
          style={{ width: rainbowWidth }}
          className="absolute top-1/2 right-14 h-6 -translate-y-1/2 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 opacity-80"
        />
      </div>

      {/* 📦 TIMELINE */}
      <div
        ref={containerRef}
        className="relative z-10 flex h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory px-[240px] items-center gap-28 nyan-scroll"
      >
        {memories.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="snap-center flex-shrink-0 w-[420px]"
          >
            <div className="relative bg-[#ffb6d9] border-4 border-white rounded-xl shadow-[10px_10px_0_rgba(0,0,0,0.4)] p-1">
              <div className="bg-[#002b55] rounded-lg p-6 text-white">
                <div className="flex justify-between items-center border-b border-white/30 pb-2 mb-4 text-[#ffb6d9]">
                  <span className="tracking-widest">ENTRY_{i + 1}</span>
                  <span className="text-lg">{m.year}</span>
                </div>
                <div className="mb-4 overflow-hidden rounded-lg border border-white/20">
                  <img
                    src={m.img}
                    alt={m.year}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <p className="text-lg leading-relaxed opacity-90">{m.text}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* 💖 END */}
        <div className="flex-shrink-0 w-[300px] text-center">
          <h2 className="text-4xl font-bold text-white mb-4 animate-pulse">
            To Be Continued…
          </h2>
          <p className="text-[#ff99cc] text-lg">❤️ Happy 6th Anniversary ❤️</p>
        </div>
      </div>

      {/* 🎨 SCROLLBAR */}
      <style>{`
        .nyan-scroll::-webkit-scrollbar {
          height: 10px;
        }
        .nyan-scroll::-webkit-scrollbar-thumb {
          background: #ff99cc;
          border-radius: 10px;
        }
        .nyan-scroll::-webkit-scrollbar-track {
          background: #001c33;
        }
      `}</style>
    </div>
  );
};

export default NyanTimeline;
