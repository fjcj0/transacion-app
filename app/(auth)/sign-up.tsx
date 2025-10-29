import Button from '@/components/AuthComponents/Button';
import FooterAuth from '@/components/AuthComponents/FooterAuth';
import HeaderAuth from '@/components/AuthComponents/HeaderAuth';
import Input from '@/components/AuthComponents/Input';
import { emailIcon, lockIcon, userIcon } from '@/constants/imags';
import { useSignUp } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import VerifyEmailScreen from './verify-email';
export default function SignUpScreen() {
    const { isLoaded, signUp } = useSignUp();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pendingVerification, setPendingVerification] = useState(false);
    const onSignUp = async () => {
        if (!isLoaded) return;
        setIsLoading(true);
        if (email.length === 0) {
            Alert.alert('ERROR', 'Email field is required!!');
            return;
        }
        if (password.length < 6) {
            Alert.alert('ERROR', 'Password length at least 6 or more!!');
            return;
        }
        if (name.length < 3) {
            Alert.alert('ERROR', 'Name length at least 3 or more!!');
            return;
        }
        try {
            await signUp.create({
                emailAddress: email,
                password,
                firstName: name,
            });
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setPendingVerification(true);
        } catch (err) {
            console.log(JSON.stringify(err, null, 2));
        } finally {
            setIsLoading(false);
        }
    }
    if (pendingVerification) return <VerifyEmailScreen email={email} />
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
                            onPress={onSignUp}
                            text='Sign Up'
                            isLoading={isLoading} />
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