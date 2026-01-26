import React, { useState, useEffect, useRef } from "react";
import Wave from "./Wave";
import Icon from "./Icon";
import DraggableWindow from "./DraggableWindow";

const RetroWaveApp = () => {
  const [windows, setWindows] = useState([]);
  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);

  useEffect(() => {
    // Initialize Howler sounds
    // NOTE: Replace these URLs with your actual MP3 file paths
    // Example: '/sounds/hover.mp3' and '/sounds/click.mp3'
    const silentAudio =
      "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";

    if (typeof window !== "undefined" && window.Howl) {
      hoverSoundRef.current = new window.Howl({
        src: ["/sounds/hover.mp3"],
        volume: 0.3,
      });

      clickSoundRef.current = new window.Howl({
        src: ["/sounds/click.mp3"],
        volume: 0.5,
      });
    }

    // Load Howler from CDN
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (hoverSoundRef.current) hoverSoundRef.current.unload();
      if (clickSoundRef.current) clickSoundRef.current.unload();
    };
  }, []);

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.play();
    }
  };

  const playClickSound = (iconLabel) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.play();
    }

    // Create new window
    const newWindow = {
      id: Date.now(),
      title: iconLabel,
      x: Math.random() * (window.innerWidth - 400),
      y: Math.random() * (window.innerHeight - 400),
    };

    setWindows([...windows, newWindow]);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter((w) => w.id !== id));
  };

  const icons = [
    { emoji: "🎮", label: "Games" },
    { emoji: "🎵", label: "Music" },
    { emoji: "🌟", label: "Favorites" },
  ];

  return (
    <div className="fixed inset-0 bg-amber-50 overflow-hidden">
      {/* Main content area */}
      <div className="relative h-full flex items-end justify-center pb-32">
        <div className="flex gap-5 z-10">
          {icons.map((icon) => (
            <Icon
              key={icon.label}
              emoji={icon.emoji}
              label={icon.label}
              onHover={playHoverSound}
              onClick={() => playClickSound(icon.label)}
            />
          ))}
        </div>
      </div>

      {/* Wave animation */}
      <Wave />

      {/* Draggable windows */}
      {windows.map((window) => (
        <DraggableWindow
          key={window.id}
          title={window.title}
          initialX={window.x}
          initialY={window.y}
          onClose={() => closeWindow(window.id)}
        />
      ))}

      {/* Retro credit badge */}
      <div className="fixed top-4 left-4 bg-amber-900 text-amber-100 px-4 py-2 rounded-lg shadow-lg font-mono text-sm">
        Retro Wave v1.0
      </div>
    </div>
  );
};

export default RetroWaveApp;
