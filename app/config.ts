// app/config.ts
export const Config = {
  API_URL: 'http://192.168.1.15:8000', // Direct hardcoded value
  ENVIRONMENT: __DEV__ ? 'development' : 'production', // Auto-detect
  
  // For debugging
  logConfig: () => {
    console.log('📱 App Config:');
    console.log('  API_URL:', Config.API_URL);
    console.log('  ENVIRONMENT:', Config.ENVIRONMENT);
    console.log('  __DEV__:', __DEV__);
  }
};