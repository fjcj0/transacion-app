import HeaderInformation from '@/components/InformationComponents/HeaderInformation';
import { profilePicture } from '@/constants/imags';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
const InformationScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.containerInformation}
            style={{ backgroundColor: 'black' }}>
            <HeaderInformation name='Omar' profilePicture={profilePicture} />
        </ScrollView>
    );
}
export default InformationScreen;
const styles = StyleSheet.create({
    containerInformation: {
        flex: 1,
        backgroundColor: 'black',
    },
});