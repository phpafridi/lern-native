import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { getAuthToken, logout } from '../utils/auth';

export default function HomeScreen() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkToken();

  }, []);

  const checkToken = async () => {
    const storedToken = await getAuthToken();

    if (!storedToken) {
      router.replace('/login'); // 🔥 auto redirect
      return;
    }

    setToken(storedToken);
    console.log('Current token:', storedToken);
  };

  const handleLogout = async () => {
    await logout();
    setToken(null);
    router.replace('/login');
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome! You are logged in.</Text>
      <Text>Token exists: {token ? 'Yes' : 'No'}</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button
        title="Go to Main App"
        onPress={() => router.replace('/login')}
      />
    </View>
  );
}