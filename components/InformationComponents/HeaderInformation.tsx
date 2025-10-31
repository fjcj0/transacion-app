import { TABS_COLORS } from '@/constants/colors';
import { FONT_NAMES } from '@/constants/fonts';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
const HeaderInformation = ({ name, profilePicture }: { name: string, profilePicture: string }) => {
    const { signOut } = useAuth();
    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert('Error', 'Failed to sign out');
        }
    };
    return (
        <View style={styles.headerInformationContainer}>
            <View style={styles.leftHeaderInformation}>
                <Image source={{ uri: profilePicture }} style={styles.profilePictureStyle} />
                <View style={styles.rightHeaderInformation}>
                    <Text style={styles.welcomeMessageStyle}>Hi, {name}</Text>
                    <View style={styles.lastTextLeftContainer}>
                        <Text style={styles.lastTextLeftHeader}>Your</Text>
                        <Text style={{ opacity: 1, color: 'white', fontWeight: 'bold' }}>Budget</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', columnGap: 5, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.textButtonStyle}>Your Transactions</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignOut}>
                    <Ionicons name='log-out' color={'white'} size={30} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default HeaderInformation;
const styles = StyleSheet.create({
    headerInformationContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftHeaderInformation: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 10,
    },
    profilePictureStyle: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    rightHeaderInformation: {
        flexDirection: 'column',
        rowGap: 5,
    },
    welcomeMessageStyle: {
        fontSize: 12,
        color: 'white',
        opacity: 0.5,
        fontFamily: FONT_NAMES.NUNITO
    },
    lastTextLeftContainer: {
        flexDirection: 'row',
        columnGap: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lastTextLeftHeader: {
        color: 'white',
        opacity: 0.5,
        fontFamily: FONT_NAMES.NUNITO
    },
    buttonStyle: {
        width: 150,
        height: 40,
        borderRadius: 10,
        borderColor: TABS_COLORS.PRIMARY_BACKGROUND,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    textButtonStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },
});