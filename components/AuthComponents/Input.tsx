import { AUTH_COLORS } from '@/constants/colors';
import { closeEyeIcon, viewEyeIcon } from '@/constants/imags';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, ImageProps, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
const Input = ({
    label,
    setValue,
    value,
    icon,
    placeholder,
    secureText = false
}: {
    label: string,
    setValue: (text: string) => void,
    value: string,
    icon: ImageProps,
    placeholder: string,
    secureText?: boolean
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(!secureText);
    const [isFocused, setIsFocused] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.labelStyle}>{label}</Text>
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
                                placeholder={placeholder}
                                placeholderTextColor={AUTH_COLORS.INPUT_PLACEHOLDER_COLOR}
                                onChangeText={setValue}
                                value={value}
                                secureTextEntry={secureText && !isPasswordVisible}
                                style={styles.inputStyle}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </View>
                    </LinearGradient>
                ) : (
                    <View style={[styles.inputInnerContainer, styles.defaultBorder]}>
                        <TextInput
                            placeholder={placeholder}
                            placeholderTextColor={AUTH_COLORS.INPUT_PLACEHOLDER_COLOR}
                            onChangeText={setValue}
                            value={value}
                            secureTextEntry={secureText && !isPasswordVisible}
                            style={styles.inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </View>
                )}
                <View style={styles.containerIconImage}>
                    <Image source={icon} style={styles.iconsSizes} />
                </View>
                {secureText && (
                    <TouchableOpacity
                        style={styles.containerEyeIconImage}
                        onPress={togglePasswordVisibility}
                    >
                        <Image
                            source={isPasswordVisible ? viewEyeIcon : closeEyeIcon}
                            style={styles.iconsSizes}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
export default Input;
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        rowGap: 10,
        position: 'relative',
        paddingHorizontal: 20,
    },
    inputWrapper: {
        position: 'relative',
    },
    labelStyle: {
        color: 'white',
        fontWeight: 'bold',
    },
    gradientBorder: {
        borderRadius: 15,
        padding: 1,
    },
    inputInnerContainer: {
        borderRadius: 15,
        backgroundColor: AUTH_COLORS.BACKGROUND_SECONDARY_COLOR,
        overflow: 'hidden',
    },
    defaultBorder: {
        borderWidth: 1,
        borderColor: AUTH_COLORS.BORDER_COLOR,
    },
    inputStyle: {
        width: '100%',
        height: 50,
        borderRadius: 13,
        paddingHorizontal: 40,
        backgroundColor: 'transparent',
        color: AUTH_COLORS.INPUT_PLACEHOLDER_COLOR,
    },
    containerIconImage: {
        position: 'absolute',
        left: 13.5,
        top: 14.5,
        bottom: 15,
        justifyContent: 'center',
        zIndex: 1,
    },
    containerEyeIconImage: {
        position: 'absolute',
        right: 15,
        top: 15,
        bottom: 15,
        justifyContent: 'center',
        zIndex: 1,
    },
    iconsSizes: {
        width: 24,
        height: 24,
    },
});