import Button from '@/components/AuthComponents/Button';
import FooterAuth from '@/components/AuthComponents/FooterAuth';
import HeaderAuth from '@/components/AuthComponents/HeaderAuth';
import Input from '@/components/AuthComponents/Input';
import { emailIcon, lockIcon, userIcon } from '@/constants/imags';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import VerifyEmailScreen from './verify-email';
export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(true);
    const signUp = () => {
        console.log(`Sign Up From here`);
    };
    if (pendingVerification) return <VerifyEmailScreen email='hello@gmail.com' />
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
                    <HeaderAuth message='Welcome Please enter your details.' title='Create an account' />
                    <View style={styles.inputsContainer}>
                        <Input
                            secureText={false}
                            icon={userIcon}
                            placeholder={'Enter your name'}
                            value={name}
                            setValue={setName}
                            label='Name'
                        />
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
                            onPress={signUp}
                            text='Sign Up' />
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <FooterAuth link='/sign-in' text="You have an account?" textLink='Sign In' />
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