import { TABS_COLORS } from '@/constants/colors';
import { FONT_NAMES } from '@/constants/fonts';
import { useAuthContext } from '@/context/AuthContext';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
const HeaderInformation = ({ name, profilePicture }: { name: string, profilePicture: string }) => {
    const { signOut } = useAuth();
    const { userDetails, setUserDetails } = useAuthContext();
    const [isUploadingPicture, setIsUploadingPicture] = useState(false);
    const handleChangeProfilePicture = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to change your profile picture.');
                return;
            }
            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });
            if (pickerResult.canceled) {
                return;
            }
            if (pickerResult.assets && pickerResult.assets.length > 0) {
                const selectedImage = pickerResult.assets[0];
                await uploadProfilePicture(selectedImage.uri, selectedImage.type || 'image/jpeg');
            }
        } catch (error) {
            console.log('Error picking image:', error);
        }
    };
    const uploadProfilePicture = async (imageUri: string, mimeType: string) => {
        try {
            setIsUploadingPicture(true);
            const formData = new FormData();
            const filename = imageUri.split('/').pop() || 'profile-picture.jpg';
            formData.append('profile_picture', {
                uri: imageUri,
                name: filename,
                type: mimeType,
            } as any);
            const response = await axios.put(
                `${process.env.EXPO_PUBLIC_SERVER_URL}/api/auth/update-profile/${userDetails?.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: 60000,
                }
            );
            if (response.data?.user) {
                setUserDetails(response.data.user);
                Alert.alert('Success', 'Profile picture updated successfully!');
            }
        } catch (error: any) {
            console.log('Error uploading profile picture:', error);
            if (error.response) {
                console.log('Server error:', error.response.data);
                Alert.alert('Upload Failed', error.response.data.error || 'Server error occurred');
            } else if (error.request) {
                console.log('No response:', error.request);
                Alert.alert('Upload Failed', 'No response from server. Please check your connection.');
            } else {
                console.log('Error:', error.message);
            }
        } finally {
            setIsUploadingPicture(false);
        }
    };
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
                <TouchableOpacity onPress={handleChangeProfilePicture} disabled={isUploadingPicture}>
                    <View style={styles.profilePictureContainer}>
                        <Image
                            source={{ uri: profilePicture }}
                            style={styles.profilePictureStyle}
                        />
                        {isUploadingPicture && (
                            <View style={styles.uploadingOverlay}>
                                <ActivityIndicator size="small" color="white" />
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
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
    profilePictureContainer: {
        position: 'relative',
    },
    profilePictureStyle: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    uploadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
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