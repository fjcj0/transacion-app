import { FONT_NAMES } from '@/constants/fonts';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const TransactionCard = ({ backgroundColor, color, title, money, percent }:
    {
        backgroundColor: string,
        color: string,
        title: string,
        money: string,
        percent: string
    }
) => {
    return (
        <View style={{
            width: 110,
            height: 125,
            backgroundColor,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingLeft: 13,
            paddingVertical: 13,
            borderRadius: 10
        }}>
            <Text style={{ fontWeight: 300, color, fontSize: 13, fontFamily: FONT_NAMES.LILITA_ONE }}>{title}</Text>
            <Text style={{ fontWeight: 'bold', color, fontSize: 13 }}>${money}</Text>
            <Text style={{ fontWeight: 300, color, fontSize: 13, paddingHorizontal: 7, paddingVertical: 4, borderRadius: 15, backgroundColor: '#FFFFFF66' }}>{percent}</Text>
        </View >
    )
}
export default TransactionCard;
const styles = StyleSheet.create({


});
