import MyButton from '@/components/MyButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, TextInput, View } from 'react-native';

export default function login() {
    const router = useRouter();
    const onLogin = () => {
        router.navigate("/signup");
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <Image source={require("@/assets/images/login.jpg")} style={{ width: "100%", height: 400 }}
                resizeMode="cover"

            />
            <View style={{ padding: 20, gap: 20, borderRadius: 10 }}>

                <TextInput placeholder='Enter Your Email' style={{ borderWidth: 1, height: 50, paddingHorizontal: 20 }}
                 onChangeText={(e)=>console.log(e)}
                />
                <TextInput placeholder='Enter Your Password' style={{ borderWidth: 1, height: 50, paddingHorizontal: 20 }}
                 />
                                 <TextInput placeholder='Enter Your Password' style={{ borderWidth: 1, height: 50, paddingHorizontal: 20 }}
                 />
                                 <TextInput placeholder='Enter Your Password' style={{ borderWidth: 1, height: 50, paddingHorizontal: 20 }}
                 />
                                 <TextInput placeholder='Enter Your Password' style={{ borderWidth: 1, height: 50, paddingHorizontal: 20 }}
                 />
                               <TextInput placeholder='Enter Your Password' style={{ borderWidth: 1, height: 50, paddingHorizontal: 20 }}
                 />
                               <TextInput placeholder='Enter Your Password' style={{ borderWidth: 1, height: 50, paddingHorizontal: 20 }}
                 />
                <MyButton title={"Login"} onPress={onLogin} />

            </View>
        </ScrollView>
    )
}