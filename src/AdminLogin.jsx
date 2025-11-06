import React from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original.js';
import { useNavigate } from 'react-router-dom';
import { Window, WindowHeader, WindowContent, Button, TextInput } from 'react95';
import adminImg from './assets/adminImg.png';
import { FaArrowRight } from 'react-icons/fa';

function AdminLogin() {
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
            <span>Administrator Login</span>
          </WindowHeader>

          <WindowContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
            }}
          >
            <img
              src={adminImg}
              alt="Administrator"
              style={{
                width: 96,
                height: 96,
                borderRadius: 12,
                marginBottom: 8,
              }}
            />
            <span style={{ color: 'white', fontSize: 14, marginBottom: 12 }}>
              Administrator
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
                style={{ width: 180 }}
              />
              <Button>
                <FaArrowRight size={12} />
              </Button>
            </div>

            <Button style={{ marginTop: 16 }} onClick={() => navigate('/')}>Switch User</Button>
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}

export default AdminLogin;
