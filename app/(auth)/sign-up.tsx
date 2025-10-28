import { StyleSheet, Text, View } from 'react-native';
export default function SignUpScreen() {
    return (
        <View style={styles.SignUpContainer}>
            <Text style={{ color: 'white' }}>Sign Up screen</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    SignUpContainer: {
        backgroundColor: 'black',
        flex: 1,
    },
})