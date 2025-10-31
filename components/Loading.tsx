import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
const CenteredSpinner = ({ size = 'large' }) => {
    return (
        <View style={styles.centeredContainer}>
            <ActivityIndicator size={size as any} color="#5e47de" />
        </View>
    );
};
const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
});
export default CenteredSpinner;