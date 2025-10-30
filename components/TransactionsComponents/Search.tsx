import { TABS_COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
const Search = () => {
    const [value, setValue] = useState('');
    return (
        <View style={styles.searchContainer}>
            <TextInput value={value} onChangeText={setValue}
                placeholder='Enter product name...' style={styles.inputSearchStyle} />
            <Ionicons name='search-circle' color={'white'} size={33} />
        </View>
    );
}
export default Search;
const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        columnGap: 5,
        marginTop: 10,
        marginBottom: 15,
    },
    inputSearchStyle: {
        width: '80%',
        height: 50,
        backgroundColor: TABS_COLORS.PRIMARY_BACKGROUND,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        color: 'white'
    },
})