import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FONT_NAMES } from '@/constants/fonts';
export default function SignInScreen() {
    return (
        <View style={styles.SignInContainer}>
            <Text style={{ color: 'white', fontFamily: FONT_NAMES.JOSEFIN_SANS }}>Sign In screen</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    SignInContainer: {
        backgroundColor: 'black',
        flex: 1,
    },
})