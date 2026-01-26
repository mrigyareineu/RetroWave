import React from 'react';

const Icon = ({ emoji, label, onHover, onClick }) => {
  return (
    <button
      onMouseEnter={onHover}
      onClick={onClick}
      className="text-6xl cursor-pointer transition-transform hover:scale-110 active:scale-95 bg-transparent border-none p-4"
      aria-label={label}
    >
      {emoji}
    </button>
  );
};

export default Icon;