import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original.js';
import { useNavigate } from 'react-router-dom';
import { Window, WindowContent, Button, TextInput } from 'react95';
import userImg from './assets/userPic.gif';
import VistaBackground from './assets/dark_vista.jpg';
import { FaArrowRight } from 'react-icons/fa';
import FloatingDots from './FloatingDots';

function GuestLogin() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

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

  const imgStyle = {
    width: 96,
    height: 96,
    borderRadius: 12,
    objectFit: 'cover',
    filter: hovered ? 'brightness(1.25)' : 'brightness(1)',
    transition: 'filter 0.3s ease',
  };

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
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
            }}
          >
            <div
              style={vistaFrameStyle}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <img src={userImg} alt="User" style={imgStyle} />
            </div>

            <span style={{ color: 'white', fontSize: 16, marginBottom: 12 }}>
              Guest
            </span>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <TextInput
                placeholder="Enter password"
                type="password"
                style={{
                  width: 180,
                  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                }}
              />
              <Button
                style={{
                  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                }}
              >
                <FaArrowRight size={12} />
              </Button>
            </div>

            <Button
              style={{
                marginTop: 16,
                fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
              }}
              onClick={() => navigate('/')}
            >
              Switch User
            </Button>
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}

export default GuestLogin;
