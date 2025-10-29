import { View, Text, ImageProps, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { AUTH_COLORS } from '@/constants/colors';
import { closeEyeIcon, viewEyeIcon } from '@/constants/imags';

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
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.labelStyle}>{label}</Text>

            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={AUTH_COLORS.INPUT_PLACEHOLDER_COLOR}
                    onChangeText={setValue} // Fixed: changed from onChange to onChangeText
                    value={value}
                    secureTextEntry={secureText && !isPasswordVisible}
                    style={styles.inputStyle}
                />

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
    inputStyle: {
        width: '100%',
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 40,
        borderWidth: 0.2,
        borderColor: '#fff',
        backgroundColor: AUTH_COLORS.BACKGROUND_SECONDARY_COLOR,
        color: AUTH_COLORS.INPUT_PLACEHOLDER_COLOR,
    },
    containerIconImage: {
        position: 'absolute',
        left: 10,
        top: 10,
        bottom: 10,
        justifyContent: 'center',
    },
    containerEyeIconImage: {
        position: 'absolute',
        right: 10,
        top: 10,
        bottom: 10,
        justifyContent: 'center',
    },
    iconsSizes: {
        width: 24,
        height: 24,
    },
});