import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, GetApp as GetAppIcon } from '@mui/icons-material';
import abnosaLogoLight from '../assets/abnosa-logo-light.jpg';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if already dismissed recently
    const dismissed = localStorage.getItem('pwa_prompt_dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      const dayInMs = 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < dayInMs) return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowPrompt(false);
    if (outcome === 'accepted') {
      localStorage.setItem('pwa_installed', 'true');
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa_prompt_dismissed', Date.now().toString());
  };

  if (!showPrompt) return null;

  return (
    <Snackbar
      open={showPrompt}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ bottom: { xs: 16, sm: 24 } }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: '#fff',
          borderRadius: '16px',
          px: 2.5,
          py: 1.5,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          border: '2px solid #1a4a1a',
          maxWidth: 420,
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={abnosaLogoLight}
          alt="Abnosa"
          sx={{ height: 56, width: 'auto', borderRadius: '8px', flexShrink: 0 }}
        />

        {/* Text */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 'bold', color: '#1a4a1a', fontFamily: '"Tajawal", sans-serif', fontSize: '0.95rem' }}
          >
            Abnosa Cafeteria
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: '#555', fontFamily: '"Tajawal", sans-serif', display: 'block', lineHeight: 1.4 }}
          >
            ثبّت التطبيق على جهازك للوصول السريع
          </Typography>
        </Box>

        {/* Install Button */}
        <Button
          onClick={handleInstall}
          variant="contained"
          size="small"
          startIcon={<GetAppIcon sx={{ fontSize: 16 }} />}
          sx={{
            bgcolor: '#1a4a1a',
            color: '#fff',
            fontFamily: '"Tajawal", sans-serif',
            fontWeight: 'bold',
            borderRadius: '8px',
            px: 2,
            flexShrink: 0,
            '&:hover': { bgcolor: '#2d6a2d' },
            fontSize: '0.8rem',
          }}
        >
          تثبيت
        </Button>

        {/* Close */}
        <IconButton
          size="small"
          onClick={handleDismiss}
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            color: '#999',
            p: 0.5,
            '&:hover': { color: '#333' },
          }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Snackbar>
  );
};

export default PWAInstallPrompt;

