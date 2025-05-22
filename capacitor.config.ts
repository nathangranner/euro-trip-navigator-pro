
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4bcbc64815244aeb83680a3883ce7a37',
  appName: 'euro-trip-navigator-pro',
  webDir: 'dist',
  server: {
    url: 'https://4bcbc648-1524-4aeb-8368-0a3883ce7a37.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      showSpinner: true
    }
  }
};

export default config;
