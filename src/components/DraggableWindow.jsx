import React, { useState, useEffect } from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';

function DraggableWindow({ title, src, onClose, onMinimize, minimized, children, borderless }) {
  const [position, setPosition] = useState({ x: 400, y: 120 });
  const [size, setSize] = useState({ width: 460, height: 420 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [resizeDir, setResizeDir] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [resizeOffset, setResizeOffset] = useState({ x: 0, y: 0 });

  const MIN_WIDTH = 300;
  const MIN_HEIGHT = 200;

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleResizeDown = (e, dir) => {
    setResizing(true);
    setResizeDir(dir);
    setResizeOffset({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      left: position.x,
      top: position.y,
    });
    e.stopPropagation();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      } else if (resizing && resizeDir) {
        const dx = e.clientX - resizeOffset.x;
        const dy = e.clientY - resizeOffset.y;

        let newWidth = resizeOffset.width;
        let newHeight = resizeOffset.height;
        let newX = resizeOffset.left;
        let newY = resizeOffset.top;

        if (resizeDir.includes('e')) newWidth = Math.max(MIN_WIDTH, resizeOffset.width + dx);
        if (resizeDir.includes('s')) newHeight = Math.max(MIN_HEIGHT, resizeOffset.height + dy);
        if (resizeDir.includes('w')) {
          const intendedWidth = resizeOffset.width - dx;
          if (intendedWidth > MIN_WIDTH) {
            newWidth = intendedWidth;
            newX = resizeOffset.left + dx;
          } else newWidth = MIN_WIDTH;
        }
        if (resizeDir.includes('n')) {
          const intendedHeight = resizeOffset.height - dy;
          if (intendedHeight > MIN_HEIGHT) {
            newHeight = intendedHeight;
            newY = resizeOffset.top + dy;
          } else newHeight = MIN_HEIGHT;
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      setResizing(false);
      setResizeDir(null);
    };

    if (dragging || resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, resizing, offset, resizeOffset, resizeDir]);

  if (minimized) return null;

  // Borderless version (for Winamp etc.)
  if (borderless) {
    return (
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
          zIndex: 20,
          cursor: dragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
      >
        {children}
      </div>
    );
  }

  // Regular framed React95 window
  return (
    <Window className="draggable-layer"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: 10,
        boxShadow: '3px 3px 0px #000', // classic 95 hard shadow
      }}
    >
      <WindowHeader
        onMouseDown={handleMouseDown}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        <span>{title}</span>
        <div>
          <Button square size="sm" onClick={onMinimize}>_</Button>
          <Button square size="sm" onClick={onClose}>X</Button>
        </div>
      </WindowHeader>

      <WindowContent style={{ padding: 0 }}>
        {children ? (
          <div style={{ width: '100%', height: size.height - 60 }}>{children}</div>
        ) : (
          <iframe
            src={src}
            title={title}
            style={{
              width: '100%',
              height: size.height - 60,
              border: 'none',
            }}
          />
        )}
      </WindowContent>

      {/* Resize handles */}
      <div onMouseDown={(e) => handleResizeDown(e, 'n')}
        style={{ position: 'absolute', top: 0, left: '50%', width: '100%', height: 6, cursor: 'ns-resize', transform: 'translateX(-50%)' }} />
      <div onMouseDown={(e) => handleResizeDown(e, 's')}
        style={{ position: 'absolute', bottom: 0, left: '50%', width: '100%', height: 6, cursor: 'ns-resize', transform: 'translateX(-50%)' }} />
      <div onMouseDown={(e) => handleResizeDown(e, 'e')}
        style={{ position: 'absolute', right: 0, top: '50%', height: '100%', width: 6, cursor: 'ew-resize', transform: 'translateY(-50%)' }} />
      <div onMouseDown={(e) => handleResizeDown(e, 'w')}
        style={{ position: 'absolute', left: 0, top: '50%', height: '100%', width: 6, cursor: 'ew-resize', transform: 'translateY(-50%)' }} />
      <div onMouseDown={(e) => handleResizeDown(e, 'ne')}
        style={{ position: 'absolute', right: 0, top: 0, width: 12, height: 12, cursor: 'nesw-resize' }} />
      <div onMouseDown={(e) => handleResizeDown(e, 'nw')}
        style={{ position: 'absolute', left: 0, top: 0, width: 12, height: 12, cursor: 'nwse-resize' }} />
      <div onMouseDown={(e) => handleResizeDown(e, 'se')}
        style={{ position: 'absolute', right: 0, bottom: 0, width: 12, height: 12, cursor: 'nwse-resize' }} />
      <div onMouseDown={(e) => handleResizeDown(e, 'sw')}
        style={{ position: 'absolute', left: 0, bottom: 0, width: 12, height: 12, cursor: 'nesw-resize' }} />
    </Window>
  );
}

export default DraggableWindow;
