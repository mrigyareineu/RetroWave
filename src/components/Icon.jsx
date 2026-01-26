import React, { useState, useEffect } from 'react';

const DraggableIcon = ({ imageSrc, alt, onHover, onClick, initialPosition, size = 'w-72 h-72' }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isShaking, setIsShaking] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasMoved(false);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseEnter = () => {
    if (!isDragging) {
      setIsShaking(true);
      onHover();
    }
  };

  const handleMouseLeave = () => {
    setIsShaking(false);
  };

  const handleClick = () => {
    // Only trigger click if the element wasn't dragged
    if (!hasMoved) {
      onClick();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setHasMoved(true);
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      className="fixed"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 100,
      }}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img
        src={imageSrc}
        alt={alt}
        className={`${size} object-contain transition-transform select-none ${
          isShaking ? 'animate-shake' : ''
        } hover:scale-105 active:scale-95`}
        style={{
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
        }}
        draggable={false}
      />
    </div>
  );
};

export default DraggableIcon;