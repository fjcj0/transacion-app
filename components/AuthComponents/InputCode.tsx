import { AUTH_COLORS } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
const InputCode = ({
    setValue,
    value,
}: {
    setValue: (text: string) => void,
    value: string,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    return (
        <View style={styles.inputWrapper}>
            {isFocused ? (
                <LinearGradient
                    colors={[AUTH_COLORS.PRIMARY_BUTTON_BACKGROUND_COLOR_START, AUTH_COLORS.PRIMARY_BUTTON_BACKGROUND_COLOR_END]}
                    style={styles.gradientBorder}
                    start={{ x: 0.5, y: 0.3 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={styles.inputInnerContainer}>
                        <TextInput
                            onChangeText={setValue}
                            value={value}
                            style={styles.inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            keyboardType="number-pad"
                            maxLength={1}
                            textAlign="center"
                        />
                    </View>
                </LinearGradient>
            ) : (
                <View style={[styles.inputInnerContainer, styles.defaultBorder]}>
                    <TextInput
                        onChangeText={setValue}
                        value={value}
                        style={styles.inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                    />
                </View>
            )}
        </View>
    );
}
export default InputCode;
const styles = StyleSheet.create({
    inputWrapper: {
        position: 'relative',
        width: 45,
        height: 45,
    },
    gradientBorder: {
        borderRadius: 15,
        padding: 1,
        width: '100%',
        height: '100%',
    },
    inputInnerContainer: {
        borderRadius: 15,
        backgroundColor: AUTH_COLORS.BACKGROUND_SECONDARY_COLOR,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    defaultBorder: {
        borderWidth: 1,
        borderColor: AUTH_COLORS.BORDER_COLOR,
    },
    inputStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 13,
        backgroundColor: 'transparent',
        color: AUTH_COLORS.INPUT_PLACEHOLDER_COLOR,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 0,
    },
});