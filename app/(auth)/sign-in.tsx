import { KeyboardAvoidingView, ScrollView, StyleSheet, View, Platform } from 'react-native';
import React, { useState } from 'react';
import HeaderAuth from '@/components/AuthComponents/HeaderAuth';
import Input from '@/components/AuthComponents/Input';
import { emailIcon, lockIcon, viewEyeIcon } from '@/constants/imags';
import Button from '@/components/AuthComponents/Button';
import FooterAuth from '@/components/AuthComponents/FooterAuth';

export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = () => {
        console.log(`Sign In From here`);
    };
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
                            label='Passwod'
                        />
                    </View>
                    <View style={styles.containerButton}>
                        <Button
                            onPress={signIn}
                            text='Log In' />
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
});