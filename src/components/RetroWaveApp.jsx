import React, { useState, useEffect, useRef } from "react";
import Wave from "./Wave";
import DraggableIcon from "./Icon";
import DraggableWindow from "./DraggableWindow";

const RetroWaveApp = () => {
  const [windows, setWindows] = useState([]);
  const hoverSoundRefs = useRef({});
  const clickSoundRef = useRef(null);

  // Configuration for each icon with unique sounds and URLs
  const icons = [
    {
      id: 'cat',
      image: '/cat.png',
      alt: 'Cat',
      position: { x: 50, y: 80 }, // Top left
      url: 'https://www.example.com',
      title: 'Cat Adventure',
    },
    {
      id: 'baty',
      image: '/baty.png', // Replace with your actual path
      alt: 'Batman',
      position: { x: window.innerWidth - 300, y: window.innerHeight - 250 }, // Bottom right
      url: 'https://www.batman.com',
      title: 'Batman Portal',
      size: 'w-80 h-80', // Slightly larger
    },
    {
      id: 'dino',
      image: '/dino.png',
      alt: 'Dinosaur',
      position: { x: window.innerWidth / 2 - 100, y: 100 }, // Top center
      url: 'https://www.dinosaur.com',
      title: 'Dino World',
      size: 'w-80 h-80', // Slightly larger
    },
    {
      id: 'car',
      image: '/car.png',
      alt: 'Car',
      position: { x: window.innerWidth - 280, y: 80 }, // Top right
      url: 'https://www.example.com',
      title: 'Car Collection',
    },
    {
      id: 'spiderman',
      image: '/spiderman.png',
      alt: 'Spiderman',
      position: { x: 100, y: window.innerHeight - 250 }, // Bottom left
      url: 'https://www.example.com',
      title: 'Spiderman Portal',
    },
    {
      id: 'froggy',
      image: '/froggy.png',
      alt: 'Frog',
      position: { x: window.innerWidth / 2 - 80, y: window.innerHeight - 220 }, // Bottom center
      url: 'https://www.frog.com',
      title: 'Froggy Land',
    },
  ];

  useEffect(() => {
    // Load Howler from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize hover sounds for each icon
      const silentAudio = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
      
      icons.forEach((icon) => {
        hoverSoundRefs.current[icon.id] = new window.Howl({
          src: ["/sounds/hover.mp3"],
          volume: 0.3,
        });
      });

      // Initialize click sound
      clickSoundRef.current = new window.Howl({
        src: ['/sounds/click.mp3'],
        volume: 0.5,
      });
    };
    document.body.appendChild(script);

    return () => {
      Object.values(hoverSoundRefs.current).forEach(sound => sound?.unload());
      if (clickSoundRef.current) clickSoundRef.current.unload();
    };
  }, []);

  const playHoverSound = (iconId) => {
    if (hoverSoundRefs.current[iconId]) {
      hoverSoundRefs.current[iconId].play();
    }
  };

  const playClickSound = (icon) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play();
    }

    // Check if a window for this icon is already open
    const existingWindow = windows.find(w => w.iconId === icon.id);
    
    if (existingWindow) {
      // If window exists, close it
      closeWindow(existingWindow.id);
    } else {
      // Close any existing window first (only one window at a time)
      setWindows([]);
      
      // Then create new window with icon reference
      const newWindow = {
        id: Date.now(),
        iconId: icon.id,
        title: icon.title,
        url: icon.url,
        x: Math.random() * (window.innerWidth - 500),
        y: Math.random() * (window.innerHeight - 400),
      };

      setWindows([newWindow]);
    }
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-amber-50 overflow-hidden">
      {/* Centered retro text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50">
        <h1 className="text-8xl font-bold text-amber-900 tracking-wider" style={{ fontFamily: 'monospace' }}>
          Welcome To Our Space!
        </h1>
        <p className="text-4xl text-amber-700 mt-8" style={{ fontFamily: 'monospace' }}>
          Play and have fun
        </p>
      </div>

      {/* Draggable icons */}
      {icons.map((icon) => (
        <DraggableIcon
          key={icon.id}
          imageSrc={icon.image}
          alt={icon.alt}
          initialPosition={icon.position}
          size={icon.size}
          onHover={() => playHoverSound(icon.id)}
          onClick={() => playClickSound(icon)}
        />
      ))}

      {/* Wave animation */}
      <Wave />

      {/* Draggable windows */}
      {windows.map((window) => (
        <DraggableWindow
          key={window.id}
          title={window.title}
          url={window.url}
          initialX={window.x}
          initialY={window.y}
          onClose={() => closeWindow(window.id)}
        />
      ))}

      {/* Retro credit badge */}
      <div className="fixed top-4 left-4 bg-amber-900 text-amber-100 px-6 py-3 rounded-lg shadow-lg font-mono text-lg z-50">
        Retro Wave App
      </div>

      {/* CSS for shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px) rotate(-2deg); }
          20%, 40%, 60%, 80% { transform: translateX(2px) rotate(2deg); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default RetroWaveApp;