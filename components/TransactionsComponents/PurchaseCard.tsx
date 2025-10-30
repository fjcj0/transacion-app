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
    FlatList,
    TextInput,
    Alert
} from 'react-native';
const USERS = [
    { id: '1', name: 'John Doe', email: 'john@example.com', avatar: '👨' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: '👩' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', avatar: '👨‍💼' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', avatar: '👩‍💼' },
    { id: '5', name: 'David Brown', email: 'david@example.com', avatar: '👨‍🎓' },
];
interface PurchaseCardProps {
    image: string;
    title: string;
    icon: ImageProps;
    salary: string;
    available: number;
}
const PurchaseCard = ({ image, title, icon, salary, available }: PurchaseCardProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [transferQuantity, setTransferQuantity] = useState('1');
    console.log('Selected User:', selectedUser);
    const onPress = () => {
        console.log('Transfer button pressed');
        setModalVisible(true);
    }
    const handleTransfer = () => {
        if (!selectedUser) {
            Alert.alert('Error', 'Please select a user to transfer to');
            return;
        }
        const quantity = parseInt(transferQuantity);
        if (!quantity || quantity <= 0) {
            Alert.alert('Error', 'Please enter a valid quantity');
            return;
        }
        if (quantity > available) {
            Alert.alert('Error', `Only ${available} items available for transfer`);
            return;
        }
        console.log('Transfer details:', {
            product: title,
            quantity: quantity,
            transferTo: selectedUser.name,
            userEmail: selectedUser.email,
            originalSalary: salary
        });
        Alert.alert(
            'Transfer Successful',
            `You transferred ${quantity} ${title} to ${selectedUser.name}`,
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
        setSelectedUser(null);
        setTransferQuantity('1');
    };
    const handleModalClose = () => {
        setModalVisible(false);
        resetForm();
    };
    const handleUserSelect = (user: any) => {
        console.log('User selected:', user.name);
        setSelectedUser(user);
    };
    const renderUserItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[
                styles.userItem,
                selectedUser?.id === item.id && styles.selectedUserItem
            ]}
            onPress={() => handleUserSelect(item)}
            activeOpacity={0.7}
        >
            <Text style={styles.userAvatar}>{item.avatar}</Text>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            {selectedUser?.id === item.id && (
                <Text style={styles.checkmark}>✓</Text>
            )}
        </TouchableOpacity>
    );
    return (
        <>
            <View style={styles.purchaseCardContainer}>
                <View style={styles.iconsContainer}>
                    <Image
                        source={{ uri: image }}
                        style={styles.purchaseImage}
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
                    <TouchableOpacity
                        style={styles.buttonStyleBuy}
                        onPress={onPress}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.textStyleButton}>Transfer</Text>
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
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Transfer {title}</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Quantity to Transfer</Text>
                            <TextInput
                                style={styles.textInput}
                                value={transferQuantity}
                                onChangeText={setTransferQuantity}
                                keyboardType="numeric"
                                placeholder="Enter quantity"
                                placeholderTextColor="#999"
                            />
                        </View>
                        <View style={styles.userSelectionContainer}>
                            <Text style={styles.inputLabel}>Select User to Transfer To</Text>
                            <View style={styles.usersListContainer}>
                                <FlatList
                                    data={USERS}
                                    renderItem={renderUserItem}
                                    keyExtractor={(item) => item.id}
                                    showsVerticalScrollIndicator={false}
                                    ListEmptyComponent={
                                        <Text style={styles.emptyText}>No users available</Text>
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={handleModalClose}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.confirmButton,
                                    (!selectedUser || !transferQuantity) && styles.disabledButton
                                ]}
                                onPress={handleTransfer}
                                disabled={!selectedUser || !transferQuantity}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.modalButtonText}>
                                    Confirm Transfer
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}
export default PurchaseCard;
const styles = StyleSheet.create({
    purchaseCardContainer: {
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
    purchaseImage: {
        width: '100%',
        height: 280,
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
        fontFamily: FONT_NAMES.COMIC_NEUE,
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
        fontFamily: FONT_NAMES.COMIC_NEUE,
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
        fontFamily: FONT_NAMES.COMIC_NEUE,
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: TABS_COLORS.PRIMARY_BACKGROUND,
        borderRadius: 15,
        padding: 20,
        width: '90%',
        maxWidth: 400,
        maxHeight: '85%',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    modalTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        color: 'white',
        fontSize: 13,
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
    userSelectionContainer: {
        marginBottom: 20,
    },
    usersListContainer: {
        maxHeight: 200,
        minHeight: 150,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    selectedUserItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: TABS_COLORS.SECONDARY_COLOR,
        borderWidth: 2,
    },
    userAvatar: {
        fontSize: 24,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 2,
    },
    userEmail: {
        color: 'lightgray',
        fontSize: 12,
    },
    checkmark: {
        color: TABS_COLORS.SECONDARY_COLOR,
        fontSize: 18,
        fontWeight: 'bold',
    },
    summaryContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 15,
        borderRadius: 10,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: TABS_COLORS.SECONDARY_COLOR,
    },
    summaryText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 12,
    },
    modalButton: {
        flex: 1,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    cancelButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    confirmButton: {
        backgroundColor: TABS_COLORS.SECONDARY_COLOR,
    },
    disabledButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        opacity: 0.5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: 'lightgray',
    },
    emptyText: {
        color: 'lightgray',
        textAlign: 'center',
        fontSize: 14,
        fontStyle: 'italic',
        padding: 30,
    },
});