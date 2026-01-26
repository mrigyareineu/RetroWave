import React, { useState, useEffect } from 'react';

const DraggableWindow = ({ title, onClose, initialX, initialY }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.resize-handle')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        setSize({
          width: Math.max(300, resizeStart.width + deltaX),
          height: Math.max(200, resizeStart.height + deltaY),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart]);

  return (
    <div
      className="fixed shadow-2xl"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: 1000,
      }}
    >
      <div className="bg-amber-100 border-4 border-amber-900 h-full flex flex-col rounded-lg overflow-hidden">
        <div
          onMouseDown={handleMouseDown}
          className="bg-amber-900 text-amber-100 px-4 py-2 flex justify-between items-center cursor-move select-none"
        >
          <span className="font-bold text-lg">{title}</span>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 rounded transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 p-6 overflow-auto">
          <p className="text-amber-900 text-lg leading-relaxed">
            Welcome to the {title} window! This is a draggable and resizable window
            with a retro aesthetic. You can move it around by dragging the header
            or resize it from the bottom-right corner.
          </p>
          <div className="mt-4 p-4 bg-amber-200 border-2 border-amber-800 rounded">
            <p className="text-amber-900 font-mono text-sm">
              &gt; System ready
              <br />
              &gt; Window ID: {Math.random().toString(36).substr(2, 9)}
              <br />
              &gt; Status: Active
            </p>
          </div>
        </div>
        <div
          onMouseDown={handleResizeMouseDown}
          className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-amber-900"
          style={{ borderTopLeftRadius: '4px' }}
        />
      </div>
    </div>
  );
};

export default DraggableWindow;