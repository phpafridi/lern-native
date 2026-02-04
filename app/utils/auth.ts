// app/utils/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save authentication data
export const saveAuthData = async (token: string, userData: any): Promise<boolean> => {
  try {
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    console.log('✅ Auth data saved successfully');
    return true;
  } catch (error) {
    console.error('❌ Error saving auth data:', error);
    return false;
  }
};

// Get authentication token
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (error) {
    console.error('❌ Error getting auth token:', error);
    return null;
  }
};

// Get user data
export const getUserData = async (): Promise<any | null> => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('❌ Error getting user data:', error);
    return null;
  }
};

// Check if user is logged in
export const isLoggedIn = async (): Promise<boolean> => {
  const token = await getAuthToken();
  return !!token;
};

// Logout user
export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userData');
    console.log('✅ Logged out successfully');
  } catch (error) {
    console.error('❌ Error during logout:', error);
  }
};