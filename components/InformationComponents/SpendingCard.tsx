import { TABS_COLORS } from '@/constants/colors';
import React from 'react';
import { Image, ImageProps, StyleSheet, Text, View } from 'react-native';
const SpendingCard = ({ icon, title, date, value }: {
    icon: ImageProps
    title: string,
    date: string,
    value: string
}) => {
    return (
        <View style={styles.cardSpendingContainer}>
            <View style={styles.leftContainerSpendingCard}>
                <View style={styles.imageContainerSpending}>
                    <Image source={icon} style={styles.imageStyleSpending} resizeMode="contain" />
                </View>
                <View style={styles.infoCardSpendingContainer}>
                    <Text style={styles.textHeaderStyleSpending}>{title}</Text>
                    <Text style={styles.textDateSpendingStyle}>{date}</Text>
                </View>
            </View>
            <View style={styles.rightContainerSpending}>
                <Text style={styles.textValueSpendingStyle}>{value}</Text>
            </View>
        </View>
    );
}
export default SpendingCard;
const styles = StyleSheet.create({
    cardSpendingContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: 50,
    },
    leftContainerSpendingCard: {
        flexDirection: 'row',
        columnGap: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainerSpending: {
        width: 45,
        height: 45,
        backgroundColor: TABS_COLORS.PRIMARY_BACKGROUND,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
    },
    imageStyleSpending: {
        width: 21,
        height: 21,
    },
    infoCardSpendingContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        rowGap: 2,
    },
    textHeaderStyleSpending: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 13,
    },
    textDateSpendingStyle: {
        color: 'white',
        fontSize: 10,
        opacity: 0.5,
    },
    rightContainerSpending: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textValueSpendingStyle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 13,
    },
});