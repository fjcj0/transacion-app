import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { arrowIcon, starIcon } from '@/constants/imags';
const HeaderAuth = ({ title, message, email }: { title: string, message: string, email?: string }) => {
    return (
        <View style={styles.containerHeaderAuth}>
            <View style={styles.containerHeaderIcons}>
                <Image source={starIcon} style={styles.starIconStyle} />
                <Image source={arrowIcon} style={styles.starIconStyle} />
            </View>
            <View style={styles.containerTextsHeaderAuth}>
                <Text style={styles.titleTextStyle}>{title}✨</Text>
                <Text style={styles.messageTextStyle}>{message} {email ? email : ''}</Text>
            </View>
        </View>
    )
}
export default HeaderAuth;
const styles = StyleSheet.create({
    containerHeaderAuth: {
        flexDirection: 'column',
        marginVertical: 30,
        paddingHorizontal: 20,

    },
    containerHeaderIcons: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    starIconStyle: {
        width: 80,
        height: 80,
    },
    containerTextsHeaderAuth: {
        marginTop: 50,
        flexDirection: 'column',
        rowGap: 15,
    },
    titleTextStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    messageTextStyle: {
        color: 'white',
        opacity: 0.5,
        fontWeight: 500,
        fontSize: 15,
    },
});