import React, { useState, useEffect, useRef } from "react";
import Wave from "./Wave";
import DraggableIcon from "./Icon";
import DraggableWindow from "./DraggableWindow";
import BatTerminal from "./BatTerminal";
import NyanTimeline from "./NyanTimeline";

const RetroWaveApp = () => {
  const [windows, setWindows] = useState([]);
  const hoverSoundRefs = useRef({});
  const clickSoundRef = useRef(null);

  /* -------------------- ICON CONFIG -------------------- */

  const icons = [
    {
      id: "cat",
      image: "/cat.png",
      alt: "Cat",
      position: { x: 50, y: 80 },
      title: "Cat Adventure",
    },
    {
      id: "baty",
      image: "/baty.png",
      alt: "Batman",
      position: {
        x: window.innerWidth - 300,
        y: window.innerHeight - 250,
      },
      title: "Batman Portal",
      size: "w-80 h-80",
    },
    {
      id: "dino",
      image: "/dino.png",
      alt: "Dinosaur",
      position: { x: window.innerWidth / 2 - 100, y: 100 },
      title: "Dino World",
    },
    {
      id: "car",
      image: "/car.png",
      alt: "Car",
      position: { x: window.innerWidth - 280, y: 80 },
      title: "Car Collection",
    },
    {
      id: "spiderman",
      image: "/spiderman.png",
      alt: "Spiderman",
      position: { x: 100, y: window.innerHeight - 250 },
      title: "Spiderman Portal",
    },
    {
      id: "froggy",
      image: "/froggy.png",
      alt: "Frog",
      position: {
        x: window.innerWidth / 2 - 80,
        y: window.innerHeight - 220,
      },
      title: "Froggy Land",
    },
  ];

  /* -------------------- AUDIO SETUP -------------------- */

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js";
    script.async = true;

    script.onload = () => {
      icons.forEach((icon) => {
        hoverSoundRefs.current[icon.id] = new window.Howl({
          src: ["/sounds/hover.mp3"],
          volume: 0.3,
        });
      });

      clickSoundRef.current = new window.Howl({
        src: ["/sounds/click.mp3"],
        volume: 0.5,
      });
    };

    document.body.appendChild(script);

    return () => {
      Object.values(hoverSoundRefs.current).forEach((s) => s?.unload());
      clickSoundRef.current?.unload();
    };
  }, []);

  const playHoverSound = (id) => {
    const sound = hoverSoundRefs.current[id];
    if (sound && !sound.playing()) sound.play();
  };

  const playClickSound = (icon) => {
    clickSoundRef.current?.play();

    const existing = windows.find((w) => w.iconId === icon.id);
    if (existing) {
      closeWindow(existing.id);
      return;
    }

    const newWindow = {
      id: Date.now(),
      iconId: icon.id,
      title: icon.title,
      x: Math.random() * (window.innerWidth - 500),
      y: Math.random() * (window.innerHeight - 400),
    };

    setWindows([newWindow]);
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  /* -------------------- WINDOW CONTENT -------------------- */

  const renderWindowContent = (window) => {
    switch (window.iconId) {
      case "baty":
        return (
          <BatTerminal
            windowId={window.id}
            onClose={() => closeWindow(window.id)}
          />
        );

      case "cat":
        return <NyanTimeline windowId={window.id} />;

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full bg-white p-8 text-center text-amber-900">
            <h2 className="text-2xl font-bold mb-4">🚧 Work in Progress</h2>
            <p className="mb-2">
              <span className="font-bold">{window.title}</span> is under
              construction.
            </p>
            <p className="text-xs opacity-40">ID: {window.iconId}</p>
          </div>
        );
    }
  };

  /* -------------------- WINDOW THEMES -------------------- */

  const WINDOW_VARIANTS = {
    baty: "bat",
    cat: "nyan",
  };

  /* -------------------- RENDER -------------------- */

  return (
    <div className="fixed inset-0 bg-amber-50 overflow-hidden">
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50">
        <h1
          className="text-8xl font-bold text-amber-900 tracking-wider"
          style={{ fontFamily: "monospace" }}
        >
          Welcome To Our Space!
        </h1>
        <p
          className="text-4xl text-amber-700 mt-8"
          style={{ fontFamily: "monospace" }}
        >
          Play and have fun
        </p>
      </div>

      {/* Icons */}
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

      {/* Windows */}
      {windows.map((window) => (
        <DraggableWindow
          key={window.id}
          title={window.title}
          initialX={window.x}
          initialY={window.y}
          onClose={() => closeWindow(window.id)}
          variant={WINDOW_VARIANTS[window.iconId] || "default"}
        >
          {renderWindowContent(window)}
        </DraggableWindow>
      ))}

      {/* Wave */}
      <Wave />

      {/* Badge */}
      <div className="fixed top-4 left-4 bg-amber-900 text-amber-100 px-6 py-3 rounded-lg shadow-lg font-mono text-lg z-50">
        Retro Wave App
      </div>

      {/* Shake Animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          20% { transform: translateX(-2px) rotate(-2deg); }
          40% { transform: translateX(2px) rotate(2deg); }
          60% { transform: translateX(-2px) rotate(-1deg); }
          80% { transform: translateX(2px) rotate(1deg); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default RetroWaveApp;
