import React, { useState, useEffect } from 'react';

const GRID_SIZE = 100;
const ICON_SIZE = 48;

function DraggableIcon({ icon, label, initialX, initialY, onDoubleClick }) {
  const [position, setPosition] = useState({
    x: Math.round(initialX / GRID_SIZE) * GRID_SIZE,
    y: Math.round(initialY / GRID_SIZE) * GRID_SIZE,
  });
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const snapToGrid = (value) => Math.round(value / GRID_SIZE) * GRID_SIZE;

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    };

    const handleMouseUp = () => {
      if (dragging) {
        setDragging(false);
        setPosition((prev) => ({
          x: snapToGrid(prev.x),
          y: snapToGrid(prev.y),
        }));
      }
    };

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={onDoubleClick}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: GRID_SIZE,
        height: GRID_SIZE,
        cursor: 'default',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: dragging ? 'none' : 'left 0.1s ease-out, top 0.1s ease-out',
        border: hovered || dragging ? '1px solid rgba(255,255,255,0.8)' : '1px solid transparent',
        background: hovered || dragging ? 'rgba(255,255,255,0.1)' : 'transparent',
        borderRadius: 6,
        backdropFilter: hovered || dragging ? 'blur(1px)' : 'none',
      }}
    >
      <img
        src={icon}
        alt={label}
        draggable={false}
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          marginBottom: 6,
          filter: dragging ? 'brightness(1.2)' : 'brightness(1)',
          transition: 'filter 0.2s ease',
          pointerEvents: 'none',
        }}
      />
      <span
        style={{
          color: 'white',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          textShadow: '1px 1px 2px black',
          fontSize: 14,
          textAlign: 'center',
          lineHeight: 1.1,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default DraggableIcon;
