import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original.js';
import { Button } from 'react95';
import DraggableIcon from './components/DraggableIcon';
import DraggableWindow from './components/DraggableWindow';
import ComputerIcon from './assets/MyComputer.gif';
import FolderIcon from './assets/FileExplorer.gif';
import RecycleIcon from './assets/RecycleBin.gif';
import AboutMeIcon from './assets/AboutMe.gif';
import VistaBackground from './assets/dark_vista.jpg';
import WindowsIcon from './assets/windows.png';

function GuestLogin() {
  const [time, setTime] = useState('');
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [minimizedAboutMe, setMinimizedAboutMe] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setShowAboutMe(true);
  }, []);

  const handleOpenAboutMe = () => {
    setShowAboutMe(true);
    setMinimizedAboutMe(false);
  };

  return (
    <ThemeProvider theme={original}>
      <div
        style={{
          backgroundImage: `url(${VistaBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          position: 'relative',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        }}
      >
        <DraggableIcon icon={RecycleIcon} label="Recycle Bin" initialX={0} initialY={30} />
        <DraggableIcon icon={ComputerIcon} label="My Computer" initialX={0} initialY={130} />
        <DraggableIcon icon={FolderIcon} label="Projects" initialX={0} initialY={230} />
        <DraggableIcon
          icon={AboutMeIcon}
          label="About Me"
          initialX={0}
          initialY={330}
          onDoubleClick={handleOpenAboutMe}
        />

        {showAboutMe && (
          <DraggableWindow
            title="Notepad - About Me"
            src="/about.html"
            onClose={() => setShowAboutMe(false)}
            onMinimize={() => setMinimizedAboutMe(true)}
            minimized={minimizedAboutMe}
          />
        )}


        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 36,
            backgroundColor: '#0a246a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Button variant="menu"><img src={WindowsIcon} style={{marginRight: "2px"}}/>Start</Button>
            {showAboutMe && minimizedAboutMe && (
              <Button
                onClick={() => setMinimizedAboutMe(false)}
                style={{
                  backgroundColor: '#c0c0c0',
                  color: 'black',
                }}
              >
                Notepad - About Me
              </Button>
            )}
          </div>
          <div
            style={{
              color: 'white',
              fontSize: 12,
              fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
            }}
          >
            {time}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default GuestLogin;
