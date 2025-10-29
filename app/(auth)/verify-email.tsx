import Button from '@/components/AuthComponents/Button';
import HeaderAuth from '@/components/AuthComponents/HeaderAuth';
import InputCode from '@/components/AuthComponents/InputCode';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
const VerifyEmailScreen = ({ email }: { email: string }) => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const verifyEmail = () => {
        const verificationCode = code.join('');
        console.log('Verification code:', verificationCode);
    }
    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code];
        const numericText = text.replace(/[^0-9]/g, '');
        if (numericText.length <= 1) {
            newCode[index] = numericText;
            setCode(newCode);
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyBoardAvoidingContainer}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <HeaderAuth
                    title='Check your email'
                    message={`We sent a verification code to ${email}`}
                />
                <View style={styles.inputCodeContainer}>
                    {code.map((digit, index) => (
                        <InputCode
                            key={index}
                            setValue={(text) => handleCodeChange(text, index)}
                            value={digit}
                        />
                    ))}
                </View>
                <View style={styles.containerButton}>
                    <Button
                        onPress={verifyEmail}
                        text='Verify Email'
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
export default VerifyEmailScreen;
const styles = StyleSheet.create({
    keyBoardAvoidingContainer: {
        flex: 1,
        backgroundColor: 'black'
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 40,
    },
    containerButton: {
        marginTop: 30,
        paddingHorizontal: 22,
    },
    inputCodeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 12,
        paddingHorizontal: 20,
    },
});