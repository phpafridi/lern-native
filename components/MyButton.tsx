// components/MyButton.tsx
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type MyButtonProps = {
    title: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
}

export default function MyButton({title, onPress, buttonStyle, textStyle, disabled}: MyButtonProps) {
    return (
        <TouchableOpacity 
            activeOpacity={0.7} 
            style={[styles.button, buttonStyle, disabled && styles.disabled]} 
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "orange", 
        paddingVertical: 15, 
        paddingHorizontal: 25, 
        borderRadius: 10,
        alignItems: "center"
    },
    text: {
        fontSize: 16, 
        color: "white", 
        fontWeight: "bold"
    },
    disabled: {
        opacity: 0.5,
    }
})