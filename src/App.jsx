import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original.js';
import { Window, WindowContent } from 'react95';
import userImg from './assets/userPic.gif';
import adminImg from './assets/adminPic.gif';
import VistaBackground from './assets/dark_vista.jpg';
import FloatingDots from './FloatingDots';

function App() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const vistaFrameStyle = {
    width: 100,
    height: 100,
    borderRadius: 16,
    padding: 4,
    background:
      'linear-gradient(145deg, rgba(255,255,255,0.6), rgba(180,220,255,0.4))',
    boxShadow:
      'inset 0 1px 2px rgba(255,255,255,0.7), inset 0 -1px 2px rgba(0,0,0,0.3), 0 0 8px rgba(0,0,0,0.5)',
    backdropFilter: 'blur(6px)',
    border: '1px solid rgba(255,255,255,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const imgStyle = (isHovered) => ({
    width: 96,
    height: 96,
    borderRadius: 12,
    objectFit: 'cover',
    filter: isHovered ? 'brightness(1.25)' : 'brightness(1)',
    transition: 'filter 0.3s ease',
  });

  return (
    <ThemeProvider theme={original}>
      <div
        style={{
          backgroundImage: `url(${VistaBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          padding: 0,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        }}
      >
        <FloatingDots />
        <Window
          style={{
            background: 'transparent',
            boxShadow: 'none',
            border: 'none',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <WindowContent
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 60,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHovered('guest')}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={vistaFrameStyle}>
                <img src={userImg} alt="User" style={imgStyle(hovered === 'guest')} />
              </div>
              <span style={{ color: 'white', fontSize: 16 }}>Guest</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHovered('admin')}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate('/admin')}
            >
              <div style={vistaFrameStyle}>
                <img src={adminImg} alt="Admin" style={imgStyle(hovered === 'admin')} />
              </div>
              <span style={{ color: 'white', fontSize: 16 }}>Administrator</span>
            </div>
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}

export default App;
