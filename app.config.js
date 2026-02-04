// app.config.js
const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  expo: {
    name: IS_DEV ? 'my-app (Dev)' : 'my-app',
    slug: 'my-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    
    extra: {
      // Dynamic API URL based on environment
      apiUrl: IS_DEV 
        ? 'http://192.168.1.7:8000'  // Development
        : 'https://your-api.com',     // Production
      environment: IS_DEV ? 'development' : 'production',
    },
    
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_DEV ? 'com.yourapp.dev' : 'com.yourapp',
    },
    android: {
      package: IS_DEV ? 'com.yourapp.dev' : 'com.yourapp',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    plugins: [
      'expo-router',
      'expo-splash-screen',
    ],
  },
};