import { AUTH_COLORS } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
const Button = ({ onPress, text, isLoading }: { onPress: () => Promise<void>, text: string, isLoading: boolean }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}
            disabled={isLoading}>
            <LinearGradient
                colors={[AUTH_COLORS.PRIMARY_BUTTON_BACKGROUND_COLOR_START, AUTH_COLORS.PRIMARY_BUTTON_BACKGROUND_COLOR_END]}
                style={styles.buttonStyle}
                start={{ x: 0.5, y: 0.3 }}
                end={{ x: 1, y: 0 }}
            >
                <Text style={styles.textStyle}>
                    {!isLoading ?
                        text
                        :
                        'Loading....'
                    }
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}
export default Button;
const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        borderRadius: 15,
        overflow: 'hidden',
    },
    buttonStyle: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
});