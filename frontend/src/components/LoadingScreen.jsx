import React from 'react';
import { Box, Typography, CircularProgress, keyframes } from '@mui/material';
import abnosaLogoLight from '../assets/abnosa-logo-light.jpg';

// Define keyframes for animations
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const LoadingScreen = () => {
  const colors = {
    primary: '#1B5E20',
    secondary: '#F57C00',
    text: '#212529',
    background: '#ffffff'
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: colors.background,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: `${pulse} 2s infinite ease-in-out`,
        }}
      >
        <Box
          component="img"
          src={abnosaLogoLight}
          alt="Abnosa Cafeteria"
          sx={{
            height: 120,
            width: 'auto',
            mb: 3,
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}
        />

        <CircularProgress 
          size={48}
          thickness={4}
          sx={{
            color: colors.primary,
            marginBottom: 2,
          }}
        />
        
        <Typography
          variant="body1"
          sx={{
            color: colors.text,
            fontFamily: '"Tajawal", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 500,
            opacity: 0.7,
          }}
        >
          جاري التحميل...
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
