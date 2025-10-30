import { TABS_COLORS } from '@/constants/colors';
import { FONT_NAMES } from '@/constants/fonts';
import React from 'react';
import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const ProductCard = ({ image, title, icon, salary, available }: {
    image: string,
    title: string,
    icon: ImageProps,
    salary: string,
    available: number
}) => {
    const onPress = () => {
        console.log('Buy product!!');
    }
    return (
        <View style={styles.productCardContainer}>
            <View style={styles.iconsContainer}>
                <Image
                    source={{ uri: image }}
                    style={styles.productImage}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.bodyContainer}>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>

                <View style={styles.companyContainer}>
                    <View style={styles.companyIconContainer}>
                        <Image source={icon} style={styles.companyIcon} />
                    </View>
                    <View style={styles.salaryContainer}>
                        <Text style={styles.salary}>{salary}</Text>
                    </View>
                </View>

                <View style={styles.availableContainer}>
                    <Text style={styles.available}>{available} available</Text>
                </View>

                <TouchableOpacity style={styles.buttonStyleBuy}>
                    <Text style={styles.textStyleButton}>Purchase</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductCard;

const styles = StyleSheet.create({
    productCardContainer: {
        flexDirection: 'column',
        rowGap: 10,
        padding: 10,
        backgroundColor: TABS_COLORS.PRIMARY_BACKGROUND,
        borderRadius: 10,
        flex: 1,
    },
    iconsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
    },
    bodyContainer: {
        flexDirection: 'column',
        rowGap: 10,
    },
    title: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    companyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 7,
    },
    companyIconContainer: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    companyIcon: {
        width: 20,
        height: 20,
        marginRight: 0.5,
        marginBottom: 0.5,
    },
    salaryContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    salary: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    availableContainer: {
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(128, 128, 128, 0.3)',
    },
    available: {
        color: 'lightgray',
        fontSize: 12,
        fontWeight: '500',
    },
    buttonStyleBuy: {
        width: 100,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: TABS_COLORS.SECONDARY_COLOR,
        marginTop: 10,
    },
    textStyleButton: {
        fontWeight: 'bold',
        color: 'white',
        fontFamily: FONT_NAMES.COMIC_NEUE
    },
});