import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original.js';
import { Window, WindowContent, WindowHeader } from 'react95';
import userImg from './assets/userImg.png';
import adminImg from './assets/adminImg.png';

function App() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={original}>
      <div
        style={{
          background: 'teal',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          padding: 0,
        }}
      >
        <Window
          style={{
            background: 'transparent',
            boxShadow: 'none',
            border: 'none',
            textAlign: 'center',
          }}
        >
          <WindowHeader style={{ textAlign: 'center', marginBottom: 24 }}>
            <span>Login</span>
          </WindowHeader>

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
            >
              <img
                src={userImg}
                alt="User"
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 12,
                  marginBottom: 8,
                }}
              />
              <span style={{ color: 'white' }}>Guest</span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/admin')}
            >
              <img
                src={adminImg}
                alt="Admin"
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 12,
                  marginBottom: 8,
                }}
              />
              <span style={{ color: 'white' }}>Administrator</span>
            </div>
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}

export default App;
