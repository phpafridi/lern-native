import MyButton from '@/components/MyButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function signup() {
    const router = useRouter();
    const onRegister = () => {
         router.navigate("/login");
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <MyButton title={"Register"} onPress={onRegister} />
        </View>
    )
}