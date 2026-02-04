import MyButton from '@/components/MyButton';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Config } from './config';
import { getAuthToken, saveAuthData } from './utils/auth'; // Add getAuthToken

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${Config.API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.user && data.user.token) {
        await saveAuthData(data.user.token, data.user);
        
        // DEBUG: Check if token was saved
        const savedToken = await getAuthToken();
        console.log('✅ Token saved successfully:', savedToken ? 'YES' : 'NO');
        console.log('🔄 Attempting to navigate to /(tabs)...');
        
        Alert.alert('Success', data.message || 'Login successful!', [
          {
            text: 'OK',
            onPress: async () => {
              console.log('🎯 Alert dismissed, navigating...');
              
              // Add a small delay to ensure Alert is dismissed
              setTimeout(() => {
                console.log('🚀 Navigating to /(tabs)');
                router.replace('/(tabs)');
              }, 100);
            }
          }
        ]);
      } else {
        throw new Error('No token received from server');
      }

    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        error.message || 'Invalid credentials or server error'
      );
    } finally {
      setLoading(false);
    }
  };

  const onSignup = () => {
    router.navigate('/signup');
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Image 
          source={require("@/assets/images/login.jpg")} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.formContainer}>
          <TextInput 
            placeholder='Enter Your Email'
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            editable={!loading}
          />
          
          <TextInput 
            placeholder='Enter Your Password'
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
            editable={!loading}
          />
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="orange" />
            </View>
          ) : (
            <>
              <MyButton 
                title={"Login"} 
                onPress={onLogin} 
              />
              
              <TouchableOpacity 
                style={styles.signupButton}
                onPress={onSignup}
                activeOpacity={0.7}
              >
                <Text style={styles.signupButtonText}>Create New Account</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: 400,
  },
  formContainer: {
    padding: 20,
    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: 'orange',
  },
  signupButtonText: {
    fontSize: 16,
    color: "orange",
    fontWeight: "bold"
  },
});