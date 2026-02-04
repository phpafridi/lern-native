import MyButton from '@/components/MyButton';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Config } from './config';

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';


export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const onRegister = async () => {
    if (!name || !email || !password || !rePassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (password !== rePassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const res = await fetch(`${Config.API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Register failed', data.message || 'Something went wrong');
        return;
      }

      Alert.alert('Success', 'Account created successfully');
      router.replace('/login');
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to server');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.container} 
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Image
          source={require('@/assets/images/signup.jpg')}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.form}>
          <TextInput
            placeholder="Enter Your Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoComplete="off"
            autoCorrect={false}
            spellCheck={false}
            autoCapitalize="words"
          />

          <TextInput
            placeholder="Enter Your Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoComplete="off"
            autoCorrect={false}
            spellCheck={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Enter Your Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="off"
            autoCorrect={false}
            spellCheck={false}
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Confirm Your Password"
            style={styles.input}
            value={rePassword}
            onChangeText={setRePassword}
            secureTextEntry
            autoComplete="off"
            autoCorrect={false}
            spellCheck={false}
            autoCapitalize="none"
          />

          <MyButton title="Register" onPress={onRegister} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 400,
  },
  form: {
    padding: 20,
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});