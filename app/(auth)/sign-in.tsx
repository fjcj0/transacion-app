import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
export default function SignInScreen() {
    return (
        <View style={styles.SignInContainer}>
            <Text style={{ color: 'white' }}>Sign In screen</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    SignInContainer: {
        backgroundColor: 'black',
        flex: 1,
    },
})