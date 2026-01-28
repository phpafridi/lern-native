import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type MyButtonProps = {
    title : string;
    onPress : any;
}

export default function MyButton({title,onPress}:MyButtonProps) {
    return (

        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "orange", paddingVertical: 15, paddingHorizontal:25 , borderRadius: 10,alignItems:"center"
    },
    text: {
        fontSize: 16, color: "white", fontWeight: "bold"
    }
})
