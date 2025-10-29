import Button from '@/components/AuthComponents/Button';
import HeaderAuth from '@/components/AuthComponents/HeaderAuth';
import InputCode from '@/components/AuthComponents/InputCode';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
const VerifyEmailScreen = ({ email }: { email: string }) => {
    const router = useRouter();
    const { isLoaded, signUp, setActive } = useSignUp()
    const [isLoadingVerify, setIsLoadingVerify] = useState(false);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code];
        const numericText = text.replace(/[^0-9]/g, '');
        if (numericText.length <= 1) {
            newCode[index] = numericText;
            setCode(newCode);
        }
    }
    const onVerifyPress = async () => {
        if (!isLoaded) return;
        setIsLoadingVerify(true);
        try {
            const current_code: any = code.join('');
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: current_code
            });
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
                router.replace('/(tabs)')
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        } finally {
            setIsLoadingVerify(false);
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
                        onPress={onVerifyPress}
                        text='Verify Email'
                        isLoading={isLoadingVerify}
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