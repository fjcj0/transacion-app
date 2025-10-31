import { TABS_COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
interface SearchProps {
    value: string;
    onChangeText: (text: string) => void;
}
const Search: React.FC<SearchProps> = ({ value, onChangeText }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder='Enter product name...'
                placeholderTextColor="#999"
                style={styles.inputSearchStyle}
            />
            <Ionicons name='search-circle' color={'white'} size={33} />
        </View>
    );
}
export default Search;
const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 5,
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    inputSearchStyle: {
        width: '80%',
        height: 50,
        backgroundColor: TABS_COLORS.PRIMARY_BACKGROUND,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        color: 'white',
        fontSize: 16,
    },
});