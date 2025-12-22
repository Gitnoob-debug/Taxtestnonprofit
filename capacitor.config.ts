import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ca.taxradar.app',
  appName: 'Tax Radar',
  webDir: 'out',
  server: {
    // For development, use local server
    // url: 'http://localhost:3000',
    // For production, use your Vercel URL
    url: 'https://taxradar.ca',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0d9488', // Teal color matching your brand
      showSpinner: false,
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#0d9488'
    }
  },
  android: {
    allowMixedContent: true
  },
  ios: {
    contentInset: 'always'
  }
};

export default config;
