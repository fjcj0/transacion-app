import { TABS_COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
interface SearchProps {
    onSearch: (query: string) => void;
}
const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [value, setValue] = useState('');
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearch(value);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [value, onSearch]);
    const handleChangeText = (text: string) => {
        setValue(text);
    };
    return (
        <View style={styles.searchContainer}>
            <TextInput
                value={value}
                onChangeText={handleChangeText}
                placeholder='Enter purchase name...'
                placeholderTextColor="#999"
                style={styles.inputSearchStyle}
            />
            <Ionicons name='search' color={'white'} size={24} />
        </View>
    );
}
export default Search;
const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: 10,
        marginTop: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: TABS_COLORS.PRIMARY_BACKGROUND,
        borderRadius: 10,
        height: 50,
    },
    inputSearchStyle: {
        flex: 1,
        height: '100%',
        color: 'white',
        fontSize: 16,
    },
});