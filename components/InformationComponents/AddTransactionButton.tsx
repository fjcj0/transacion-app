import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
const AddTransactionButton = () => {
    return (
        <TouchableOpacity style={styles.buttonStyleAdd}>
            <Text style={styles.textStyleAdd}>+</Text>
        </TouchableOpacity>
    );
}
export default AddTransactionButton;
const styles = StyleSheet.create({
    buttonStyleAdd: {
        width: 80,
        height: 125,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderStyle: 'dashed',
    },
    textStyleAdd: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    }
});