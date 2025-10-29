import Button from '@/components/AuthComponents/Button';
import FooterAuth from '@/components/AuthComponents/FooterAuth';
import HeaderAuth from '@/components/AuthComponents/HeaderAuth';
import Input from '@/components/AuthComponents/Input';
import { emailIcon, lockIcon } from '@/constants/imags';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
export default function SignInScreen() {
    const router = useRouter();
    const { signIn, setActive, isLoaded } = useSignIn();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSignInPress = async () => {
        if (!isLoaded) return;
        if (email.length === 0) {
            Alert.alert('ERROR', 'Email field is required!!');
            return;
        }
        if (password.length < 6) {
            Alert.alert('ERROR', 'Password length at least 6 or more!!');
            return;
        }
        setIsLoading(true);
        try {
            const signInAttempt = await signIn.create({
                identifier: email,
                password,
            });
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/(tabs)');
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err: any) {
            if (err.errors && err.errors.length > 0) {
                const clerkError = err.errors[0];
                Alert.alert('ERROR', clerkError.longMessage || clerkError.message);
            } else {
                Alert.alert('ERROR', err.message || 'An error occurred during sign in');
            }
            console.log(JSON.stringify(err, null, 2))
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.SignInContainer}
                style={styles.scrollView}
            >
                <View>
                    <HeaderAuth message='Welcome Please enter your details.' title='Log in to your account' />
                    <View style={styles.inputsContainer}>
                        <Input
                            secureText={false}
                            icon={emailIcon}
                            placeholder={'Enter your email'}
                            value={email}
                            setValue={setEmail}
                            label='Email'
                        />
                        <Input
                            secureText={true}
                            icon={lockIcon}
                            placeholder={'Enter your password'}
                            value={password}
                            setValue={setPassword}
                            label='Password'
                        />
                    </View>
                    <View style={styles.containerButton}>
                        <Button
                            onPress={onSignInPress}
                            text='Log In'
                            isLoading={isLoading}
                        />
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <FooterAuth link='/sign-up' text="don't have an account?" textLink='Sign up' />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: 'black',
    },
    scrollView: {
        backgroundColor: 'black',
        flex: 1,
    },
    SignInContainer: {
        backgroundColor: 'black',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    formSignInContainer: {
        flexDirection: 'column',
    },
    inputsContainer: {
        flexDirection: 'column',
        rowGap: 20,
    },
    containerButton: {
        marginTop: 15,
        paddingHorizontal: 22,
    },
    footerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorContainer: {
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        borderColor: 'rgb(220, 38, 38)',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginHorizontal: 22,
        marginBottom: 20,
    },
    errorText: {
        color: 'rgb(220, 38, 38)',
        fontSize: 14,
        textAlign: 'center',
    },
});