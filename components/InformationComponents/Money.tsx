import { TABS_COLORS } from '@/constants/colors';
import { FONT_NAMES } from '@/constants/fonts';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const Money = ({ money, percentPurchase }: { money: number, percentPurchase: number }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentPurchase / 100) * circumference;
    return (
        <View style={styles.containerMoney}>
            <View style={styles.leftContainerMoney}>
                <Text style={{ color: 'white' }}>My <Text style={{ fontWeight: 'bold', fontFamily: FONT_NAMES.LILITA_ONE }}>Money</Text></Text>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, fontFamily: FONT_NAMES.LILITA_ONE }}>${money}</Text>
            </View>

            <View style={styles.rightContainer}>
                <View style={styles.circleContainer}>
                    <View style={styles.circleBackground} />
                    <View style={[
                        styles.circleProgress,
                        {
                            transform: [{ rotate: '-90deg' }],
                            width: radius * 2,
                            height: radius * 2,
                            borderRadius: radius,
                            borderWidth: 3,
                            borderLeftColor: percentPurchase >= 50 ? '#FF6B6B' : TABS_COLORS.SECONDARY_COLOR,
                            borderBottomColor: percentPurchase >= 50 ? '#FF6B6B' : TABS_COLORS.SECONDARY_COLOR,
                            borderRightColor: percentPurchase >= 50 ? '#FF6B6B' : TABS_COLORS.SECONDARY_COLOR,
                            borderTopColor: 'transparent',
                        }
                    ]} />
                    <Text style={styles.percentText}>{percentPurchase}%</Text>
                </View>
            </View>
        </View>
    );
}
export default Money;
const styles = StyleSheet.create({
    containerMoney: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftContainerMoney: {
        flexDirection: 'column',
        rowGap: 5,
    },
    rightContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
    },
    circleBackground: {
        position: 'absolute',
        width: 90,
        height: 90,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    circleProgress: {
        position: 'absolute',
        borderLeftColor: '#4ECDC4',
        borderBottomColor: '#4ECDC4',
        borderRightColor: '#4ECDC4',
        borderTopColor: 'transparent',
    },
    percentText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: FONT_NAMES.LILITA_ONE,
    },
});