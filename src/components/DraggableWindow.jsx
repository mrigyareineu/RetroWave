// import React, { useState, useEffect } from 'react';

// const DraggableWindow = ({ title, url, onClose, initialX, initialY }) => {
//   const [position, setPosition] = useState({ x: initialX, y: initialY });
//   const [size, setSize] = useState({ width: 1200, height: 800 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [isResizing, setIsResizing] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
//   const [isMaximized, setIsMaximized] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [savedSize, setSavedSize] = useState({ width: 1200, height: 800 });
//   const [savedPosition, setSavedPosition] = useState({ x: initialX, y: initialY });

//   const handleMouseDown = (e) => {
//     if (e.target.closest('.resize-handle')) return;
//     setIsDragging(true);
//     setDragOffset({
//       x: e.clientX - position.x,
//       y: e.clientY - position.y,
//     });
//   };

//   const handleResizeMouseDown = (e) => {
//     e.stopPropagation();
//     setIsResizing(true);
//     setResizeStart({
//       x: e.clientX,
//       y: e.clientY,
//       width: size.width,
//       height: size.height,
//     });
//   };

//   const handleMaximize = () => {
//     if (isMaximized) {
//       // Restore to saved size
//       setSize(savedSize);
//       setPosition(savedPosition);
//       setIsMaximized(false);
//     } else {
//       // Save current state and maximize
//       setSavedSize(size);
//       setSavedPosition(position);
//       setPosition({ x: 0, y: 0 });
//       setSize({ width: window.innerWidth, height: window.innerHeight });
//       setIsMaximized(true);
//       setIsMinimized(false);
//     }
//   };

//   const handleMinimize = () => {
//     if (isMinimized) {
//       // Restore to saved size
//       setSize(savedSize);
//       setPosition(savedPosition);
//       setIsMinimized(false);
//     } else {
//       // Save current state and minimize
//       setSavedSize(size);
//       setSavedPosition(position);
//       setSize({ width: 300, height: 60 });
//       setPosition({ x: 10, y: window.innerHeight - 80 });
//       setIsMinimized(true);
//       setIsMaximized(false);
//     }
//   };

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isDragging) {
//         setPosition({
//           x: e.clientX - dragOffset.x,
//           y: e.clientY - dragOffset.y,
//         });
//       }
//       if (isResizing) {
//         const deltaX = e.clientX - resizeStart.x;
//         const deltaY = e.clientY - resizeStart.y;
//         setSize({
//           width: Math.max(400, resizeStart.width + deltaX),
//           height: Math.max(300, resizeStart.height + deltaY),
//         });
//       }
//     };

//     const handleMouseUp = () => {
//       setIsDragging(false);
//       setIsResizing(false);
//     };

//     if (isDragging || isResizing) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging, isResizing, dragOffset, resizeStart]);

//   return (
//     <div
//       className="fixed shadow-2xl"
//       style={{
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         width: `${size.width}px`,
//         height: `${size.height}px`,
//         zIndex: 1000,
//       }}
//     >
//       <div className="bg-amber-100 border-4 border-amber-900 h-full flex flex-col rounded-lg overflow-hidden">
//         <div
//           onMouseDown={handleMouseDown}
//           className="bg-amber-900 text-amber-100 px-4 py-2 flex justify-between items-center cursor-move select-none"
//         >
//           <span className="font-bold text-3xl">{title}</span>
//           <div className="flex gap-2">
//             <button
//               onClick={handleMinimize}
//               className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-3 py-1 rounded transition-colors"
//               title={isMinimized ? "Restore" : "Minimize"}
//             >
//               {isMinimized ? "▲" : "▼"}
//             </button>
//             <button
//               onClick={handleMaximize}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded transition-colors"
//               title={isMaximized ? "Restore" : "Maximize"}
//             >
//               {isMaximized ? "❐" : "■"}
//             </button>
//             <button
//               onClick={onClose}
//               className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 rounded transition-colors"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//         <div className={`flex-1 overflow-auto bg-white p-8 ${isMinimized ? 'hidden' : ''}`}>
//           <div className="text-amber-900">
//             <h2 className="text-3xl font-bold mb-4">{title}</h2>
//             <p className="text-lg mb-6 leading-relaxed">
//               Welcome to {title}! This is a draggable and resizable window where you can explore content related to this collection.
//             </p>
//             <div className="bg-amber-100 border-2 border-amber-800 rounded-lg p-6 mb-6">
//               <p className="font-mono text-base mb-4">
//                 &gt; System ready<br />
//                 &gt; Window ID: {Math.random().toString(36).substr(2, 9)}<br />
//                 &gt; Status: Active<br />
//                 &gt; Collection: {title}<br />
//               </p>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-amber-50 border-2 border-amber-400 rounded p-4">
//                 <h3 className="font-bold text-lg mb-2">✨ Features</h3>
//                 <ul className="text-sm space-y-1">
//                   <li>• Draggable window</li>
//                   <li>• Resizable content</li>
//                   <li>• Retro design</li>
//                   <li>• Interactive UI</li>
//                 </ul>
//               </div>
//               <div className="bg-amber-50 border-2 border-amber-400 rounded p-4">
//                 <h3 className="font-bold text-lg mb-2">🎯 Options</h3>
//                 <ul className="text-sm space-y-1">
//                   <li>• Drag from header</li>
//                   <li>• Resize from corner</li>
//                   <li>• Click to close (×)</li>
//                   <li>• Scroll to navigate</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div
//           onMouseDown={handleResizeMouseDown}
//           className={`resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-amber-900 ${isMinimized || isMaximized ? 'hidden' : ''}`}
//           style={{ borderTopLeftRadius: '4px' }}
//         />
//       </div>
//     </div>
//   );
// };

// export default DraggableWindow;



import React, { useState, useEffect } from "react";

/* 🎨 WINDOW THEMES */
const WINDOW_THEMES = {
  bat: {
    header: "bg-neutral-900 border-yellow-500 text-yellow-500",
    accent: "yellow-500",
    icon: "🦇",
  },
  nyan: {
    header: "bg-pink-500 border-white text-white",
    accent: "pink-300",
    icon: "🐱",
  },
  default: {
    header: "bg-neutral-800 border-neutral-400 text-neutral-200",
    accent: "neutral-400",
    icon: "🪟",
  },
};

const DraggableWindow = ({
  title,
  onClose,
  initialX = 50,
  initialY = 50,
  variant = "default",
  children,
}) => {
  const theme = WINDOW_THEMES[variant] || WINDOW_THEMES.default;

  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [savedSize, setSavedSize] = useState({ width: 800, height: 600 });
  const [savedPosition, setSavedPosition] = useState({
    x: initialX,
    y: initialY,
  });

  const handleMouseDown = (e) => {
    if (
      e.target.closest(".resize-handle") ||
      e.target.closest(".window-controls")
    )
      return;
    setIsDragging(true);
    setDragOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  const handleMaximize = () => {
    if (isMaximized) {
      setSize(savedSize);
      setPosition(savedPosition);
      setIsMaximized(false);
    } else {
      setSavedSize(size);
      setSavedPosition(position);
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMaximized(true);
      setIsMinimized(false);
    }
  };

  const handleMinimize = () => {
    if (isMinimized) {
      setSize(savedSize);
      setPosition(savedPosition);
      setIsMinimized(false);
    } else {
      setSavedSize(size);
      setSavedPosition(position);
      setSize({ width: 300, height: 40 });
      setPosition({ x: 10, y: window.innerHeight - 50 });
      setIsMinimized(true);
      setIsMaximized(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
      if (isResizing) {
        const dx = e.clientX - resizeStart.x;
        const dy = e.clientY - resizeStart.y;
        setSize({
          width: Math.max(400, resizeStart.width + dx),
          height: Math.max(300, resizeStart.height + dy),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart]);

  return (
    <div
      className="fixed shadow-2xl rounded-lg overflow-hidden flex flex-col"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: isDragging ? 1100 : 1000,
      }}
    >
      {/* 🧢 HEADER */}
      <div
        onMouseDown={handleMouseDown}
        className={`border-b px-4 py-2 flex justify-between items-center cursor-move select-none h-10 ${theme.header}`}
      >
        <span className="font-mono font-bold text-sm tracking-widest uppercase flex items-center gap-2">
          {theme.icon} {title}
        </span>

        <div className="window-controls flex gap-3 text-sm">
          <button onClick={handleMinimize}>_</button>
          <button onClick={handleMaximize}>□</button>
          <button onClick={onClose} className="hover:text-red-600">
            ×
          </button>
        </div>
      </div>

      {/* 🪟 CONTENT */}
      <div className={`flex-1 relative bg-black ${isMinimized ? "hidden" : ""}`}>
        {children}

        {/* ↘ RESIZE */}
        <div
          onMouseDown={handleResizeMouseDown}
          className={`resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize hover:bg-${theme.accent}/50`}
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />
      </div>
    </div>
  );
};

export default DraggableWindow;
