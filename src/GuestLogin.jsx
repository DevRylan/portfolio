import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original.js';
import { Button } from 'react95';
import WinampPlayer from "./components/WinampPlayer";
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
  const [showWinamp, setShowWinamp] = useState(false);

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

  useEffect(() => {
    openWindow('about', 'Notepad - About Me', '/about.html');
  }, []);

  const openWindow = (id, title, src, component, borderless = false) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        return prev.map((w) =>
          w.id === id ? { ...w, minimized: false, visible: true } : w
        );
      }
      return [
        ...prev,
        { id, title, src, component, minimized: false, visible: true, borderless },
      ];
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
    {
      id: 'winamp',
      title: 'Winamp',
      icon: '🎵',
      onClick: () => setShowWinamp(true),
    },
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

        {windows.map(
          (w) =>
            w.visible && (
              <DraggableWindow
                key={w.id}
                title={w.title}
                onMinimize={() => toggleMinimize(w.id)}
                onClose={() => closeWindow(w.id)}
                minimized={w.minimized}
                borderless={w.borderless}
              >
                {w.component ? (
                  w.component
                ) : (
                  <iframe
                    src={w.src}
                    title={w.title}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                )}
              </DraggableWindow>
            )
        )}

        {showWinamp && (
          <div
            style={{
              position: "absolute",
              left: "400px",
              top: "120px",
              zIndex: 10,
              cursor: "grab",
            }}
            onMouseDown={(e) => {
              const allWindows = document.querySelectorAll(".draggable-layer");
              allWindows.forEach((el) => (el.style.zIndex = 10));
              e.currentTarget.style.zIndex = 100;
            }}
            className="draggable-layer"
          >
            <WinampPlayer onClose={() => setShowWinamp(false)} />
          </div>
        )}

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
                onClick={() => {
                  setShowStartMenu(false);
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    openWindow(item.id, item.title, item.src, item.component, item.borderless);
                  }
                }}
              >
                {item.icon} {item.title}
              </div>
            ))}
          </div>
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

            {windows
              .filter((w) => w.visible)
              .map((w) => (
                <Button
                  key={w.id}
                  active={!w.minimized}
                  onClick={() => toggleMinimize(w.id)}
                  style={{
                    fontSize: 12,
                    padding: '4px 8px',
                    backgroundColor: w.minimized ? '#c0c0c0' : '#dfdfdf',
                  }}
                >
                  {w.title ? w.title.replace(/ - About Me| - Calculator/, '') : 'App'}
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
