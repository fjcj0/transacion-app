import { TABS_COLORS } from '@/constants/colors';
import { FONT_NAMES } from '@/constants/fonts';
import React, { useState } from 'react';
import {
    Image,
    ImageProps,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    TextInput,
    Alert
} from 'react-native';
interface ProductCardProps {
    image: string;
    title: string;
    icon: string;
    salary: string;
    available: number;
}
const ProductCard = ({ image, title, icon, salary, available }: ProductCardProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState('1');
    const [newSalary, setNewSalary] = useState('');
    const handlePurchase = () => {
        const quantityNum = parseInt(quantity);
        const salaryNum = parseFloat(newSalary);
        if (!quantity || quantityNum <= 0) {
            Alert.alert('Error', 'Please enter a valid quantity');
            return;
        }
        if (!newSalary || salaryNum <= 0) {
            Alert.alert('Error', 'Please enter a valid salary');
            return;
        }

        if (quantityNum > available) {
            Alert.alert('Error', `Only ${available} items available`);
            return;
        }
        console.log('Purchase details:', {
            product: title,
            quantity: quantityNum,
            newSalary: salaryNum,
            originalSalary: salary
        });
        Alert.alert(
            'Purchase Successful',
            `You purchased ${quantity} item(s) with salary $${salaryNum}`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setModalVisible(false);
                        resetForm();
                    }
                }
            ]
        );
    };
    const resetForm = () => {
        setQuantity('1');
        setNewSalary('');
    };
    const handleModalClose = () => {
        setModalVisible(false);
        resetForm();
    };
    return (
        <>
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
                            <Image source={{ uri: icon }} style={styles.companyIcon} />
                        </View>
                        <View style={styles.salaryContainer}>
                            <Text style={styles.salary}>${salary}</Text>
                        </View>
                    </View>

                    <View style={styles.availableContainer}>
                        <Text style={styles.available}>{available} available</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStyleBuy}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.textStyleButton}>Purchase</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Purchase {title}</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Quantity</Text>
                            <TextInput
                                style={styles.textInput}
                                value={quantity}
                                onChangeText={setQuantity}
                                keyboardType="numeric"
                                placeholder="Enter quantity"
                                placeholderTextColor="#999"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>New Salary</Text>
                            <TextInput
                                style={styles.textInput}
                                value={newSalary}
                                onChangeText={setNewSalary}
                                keyboardType="numeric"
                                placeholder="Enter new salary"
                                placeholderTextColor="#999"
                            />
                        </View>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={handleModalClose}
                            >
                                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handlePurchase}
                            >
                                <Text style={styles.modalButtonText}>
                                    Confirm Purchase
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: TABS_COLORS.PRIMARY_BACKGROUND,
        borderRadius: 15,
        padding: 20,
        width: '100%',
        maxWidth: 400,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    modalTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 8,
        padding: 12,
        color: 'white',
        fontSize: 16,
    },
    availableText: {
        color: 'lightgray',
        fontSize: 12,
        marginTop: 5,
        fontStyle: 'italic',
    },
    originalSalaryText: {
        color: 'lightgray',
        fontSize: 12,
        marginTop: 5,
        fontStyle: 'italic',
    },
    totalContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    totalText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
    modalButton: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    confirmButton: {
        backgroundColor: TABS_COLORS.SECONDARY_COLOR,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: 'lightgray',
    },
});