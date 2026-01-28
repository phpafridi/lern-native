import MyButton from '@/components/MyButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

export default function signup() {
    const router = useRouter();
    const onRegister = () => {
        router.navigate("/login");
    }

    return (
        <View style={{ flex: 1 }}>
            <Image source={require("@/assets/images/signup.jpg")} style={{ width: "100%", height: 400 }}
                resizeMode="cover"

            />
            <View style={{ padding: 20, gap: 20, borderRadius: 10 }}>

                <TextInput placeholder='Enter Your Name' style={{ borderWidth: 1, height: 50, paddingHorizontal: 20 }}
                    onChangeText={(e) => console.log(e)}
                />
                <TextInput placeholder='Enter Your Email' style={{ borderWidth: 1, height: 50, paddingHorizontal: 20 }}
                    onChangeText={(e) => console.log(e)}
                />
                <TextInput placeholder='Enter Your Password' style={{ borderWidth: 1, height: 50, paddingHorizontal: 20 }}
                />
                <TextInput placeholder='Enter Your RePassword' style={{ borderWidth: 1, height: 50, paddingHorizontal: 20 }}
                    onChangeText={(e) => console.log(e)}
                />
                <MyButton title={"Login"} onPress={onRegister} />

            </View>
        </View>
    )
}