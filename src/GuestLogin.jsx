import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original.js';
import { Button } from 'react95';
import DraggableIcon from './components/DraggableIcon';
import DraggableWindow from './components/DraggableWindow';
import ComputerIcon from './assets/MyComputer.gif';
import FolderIcon from './assets/FileExplorer.gif';
import RecycleIcon from './assets/RecycleBin.gif';
import AboutMeIcon from './assets/AboutMe.gif';
import MusicIcon from './assets/Music.gif';
import AnimalsIcon from './assets/Animals.gif';
import FriendsIcon from './assets/Friends.ico';
import ChatIcon from './assets/Smile.gif';
import ContactMeIcon from './assets/Mail.png';
import VistaBackground from './assets/dark_vista.jpg';
import WindowsIcon from './assets/windows.png';

function GuestLogin() {
  const [time, setTime] = useState('');
  const [windows, setWindows] = useState([]);
  const [showStartMenu, setShowStartMenu] = useState(false);

  const startMenuRef = useRef(null);
  const startButtonRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Automatically open About Me
  useEffect(() => {
    openWindow('about', 'Notepad - About Me', '/about.html');
  }, []);

  const openWindow = (id, title, src) => {
    setWindows((prev) => {
      const exists = prev.find((w) => w.id === id);
      if (exists) {
        return prev.map((w) =>
          w.id === id ? { ...w, minimized: false, visible: true } : w
        );
      }
      return [...prev, { id, title, src, minimized: false, visible: true }];
    });
    setShowStartMenu(false);
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const toggleMinimize = (id) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, minimized: !w.minimized } : w
      )
    );
  };

  // Hide Start Menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(e.target) &&
        startButtonRef.current &&
        !startButtonRef.current.contains(e.target)
      ) {
        setShowStartMenu(false);
      }
    };

    if (showStartMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showStartMenu]);

 const startMenuItems = [
  { id: 'about', title: 'Notepad - About Me', src: '/about.html', icon: '📝' },
  { id: 'calculator', title: 'Calculator', src: '/calculator.html', icon: '🧮' },
  { id: 'winamp', title: 'Winamp', src: '/winamp.html', icon: '🎵' },
  { id: 'jspaint', title: 'JSPaint', src: 'https://jspaint.app/', icon: '🎨' },
];


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
        {/* Desktop Icons */}
        <DraggableIcon icon={RecycleIcon} label="Recycle Bin" initialX={0} initialY={30} />
        <DraggableIcon icon={ComputerIcon} label="My Computer" initialX={0} initialY={130} />
        <DraggableIcon icon={FolderIcon} label="Projects" initialX={0} initialY={230} />
        <DraggableIcon
          icon={AboutMeIcon}
          label="About Me"
          initialX={0}
          initialY={330}
          onDoubleClick={() => openWindow('about', 'Notepad - About Me', '/about.html')}
        />
        <DraggableIcon icon={AnimalsIcon} label="My Animals" initialX={0} initialY={380} />
        <DraggableIcon icon={MusicIcon} label="Music" initialX={0} initialY={480} />
        <DraggableIcon icon={FriendsIcon} label="Friends" initialX={100} initialY={0} />
        <DraggableIcon icon={ChatIcon} label="Chat" initialX={100} initialY={130} />
        <DraggableIcon icon={ContactMeIcon} label="Contact Me!" initialX={100} initialY={230} />

        {/* Active Windows */}
        {windows.map(
          (w) =>
            w.visible && (
              <DraggableWindow
                key={w.id}
                title={w.title}
                src={w.src}
                minimized={w.minimized}
                onMinimize={() => toggleMinimize(w.id)}
                onClose={() => closeWindow(w.id)}
              />
            )
        )}

        {/* Start Menu */}
        {showStartMenu && (
          <div
            ref={startMenuRef}
            style={{
              position: 'fixed',
              bottom: 36,
              left: 4,
              width: 260,
              backgroundColor: '#1b1b1b',
              border: '2px solid #c0c0c0',
              boxShadow: '0px 0px 8px rgba(0,0,0,0.5)',
              padding: '8px 0',
              zIndex: 100,
              color: 'white',
              fontSize: 14,
              borderRadius: 4,
              animation: 'slideUp 0.15s ease-out',
            }}
          >
            {startMenuItems.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '6px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onClick={() => openWindow(item.id, item.title, item.src)}
              >
                {item.icon} {item.title}
              </div>
            ))}
          </div>
        )}

        {/* Taskbar */}
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
            zIndex: 99,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Button
              ref={startButtonRef}
              variant="menu"
              onClick={() => setShowStartMenu((prev) => !prev)}
            >
              <img
                src={WindowsIcon}
                alt="Windows"
                style={{ marginRight: 4, width: 16, height: 16 }}
              />
              Start
            </Button>

            {/* Taskbar Tabs */}
            {windows.map((w) => (
              <Button
                key={w.id}
                onClick={() => toggleMinimize(w.id)}
                style={{
                  backgroundColor: !w.minimized ? '#d0d0d0' : '#c0c0c0',
                  color: 'black',
                }}
              >
                {w.title}
              </Button>
            ))}
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
