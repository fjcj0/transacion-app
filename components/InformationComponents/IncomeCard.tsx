import { TABS_COLORS } from '@/constants/colors';
import { FONT_NAMES } from '@/constants/fonts';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
const IncomeCard = ({ title, icon, value }: {
    title: string,
    icon: string,
    value: string
}) => {
    return (
        <View style={styles.cardIncomeStyle}>
            <View style={styles.iconIncomeContainer}>
                <Image source={{ uri: icon }} style={styles.iconIncomeStyle} />
            </View>
            <Text style={styles.titleIncomeStyle}>{title}</Text>
            <Text style={styles.moneyIncomeStyle}>${value}</Text>
        </View>
    );
}
export default IncomeCard;
const styles = StyleSheet.create({
    cardIncomeStyle: {
        width: 150,
        height: 120,
        backgroundColor: TABS_COLORS.PRIMARY_BACKGROUND,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingLeft: 18,
        paddingVertical: 13,
        borderRadius: 15,
    },
    iconIncomeContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'white',
    },
    iconIncomeStyle: {
        width: 15,
        height: 15,
        marginBottom: 0.8,
    },
    titleIncomeStyle: {
        color: 'white',
        fontFamily: FONT_NAMES.NUNITO
    },
    moneyIncomeStyle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
});