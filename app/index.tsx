import MyButton from '@/components/MyButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function index() {
    const router = useRouter();
    const onContinue = () => {
        router.navigate("/login");
    }
    const Users = () => {
        router.navigate("/users");
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <MyButton title={"Continue"} onPress={onContinue} />
        
            <MyButton title={"Users"} onPress={Users} />
        </View>
    )
}