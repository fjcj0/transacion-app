import { TABS_COLORS } from '@/constants/colors';
import { FONT_NAMES } from '@/constants/fonts';
import { useAuthContext } from '@/context/AuthContext';
import axios from 'axios';
import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    FlatList,
    TextInput,
    Alert,
    ActivityIndicator
} from 'react-native';
interface PurchaseCardProps {
    image: string;
    title: string;
    icon: string;
    salary: string;
    available: number;
    productId: number;
}
interface User {
    id: string;
    name: string;
    email: string;
    profile_picture: string;
}
const PurchaseCard = ({ image, title, icon, salary, available, productId }: PurchaseCardProps) => {
    const [users, setUsers] = useState<User[] | null>(null);
    const { userDetails } = useAuthContext();
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [transferQuantity, setTransferQuantity] = useState('1');
    const hanldeUsers = async () => {
        try {
            setIsLoadingUsers(true);
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/auth/users/${userDetails?.id}`);
            setUsers(response?.data?.users);
        } catch (error) {
            setUsers([]);
        } finally {
            setIsLoadingUsers(false);
        }
    }
    const onPress = () => {
        hanldeUsers();
        setModalVisible(true);
    }
    const handleTransfer = () => {
        if (!selectedUser) {
            Alert.alert('Error', 'Please select a user to transfer to');
            return;
        }
        const quantity = parseInt(transferQuantity);
        if (isNaN(quantity) || quantity <= 0) {
            Alert.alert('Error', 'Please enter a valid quantity');
            return;
        }
        if (quantity > available) {
            Alert.alert('Error', `Only ${available} items available for transfer`);
            return;
        }
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
    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };
    const renderUserItem = ({ item }: { item: User }) => (
        <TouchableOpacity
            style={[
                styles.userItem,
                selectedUser?.id === item.id && styles.selectedUserItem
            ]}
            onPress={() => handleUserSelect(item)}
            activeOpacity={0.7}
        >
            <Image
                source={{ uri: item.profile_picture }}
                style={styles.userAvatar}
                resizeMode="cover"
            />
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
                            <Image source={{ uri: icon }} style={styles.companyIcon} />
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
                                onChangeText={(text) => {
                                    if (/^\d*$/.test(text)) {
                                        setTransferQuantity(text);
                                    }
                                }}
                                keyboardType="numeric"
                                placeholder="Enter quantity"
                                placeholderTextColor="#999"
                                maxLength={3}
                            />
                        </View>
                        <View style={styles.userSelectionContainer}>
                            <Text style={styles.inputLabel}>Select User to Transfer To</Text>
                            <View style={styles.usersListContainer}>
                                {isLoadingUsers ? (
                                    <View style={styles.loadingContainer}>
                                        <ActivityIndicator
                                            size="large"
                                            color={TABS_COLORS.SECONDARY_COLOR}
                                        />
                                        <Text style={styles.loadingText}>Loading users...</Text>
                                    </View>
                                ) : (
                                    <FlatList
                                        data={users}
                                        renderItem={renderUserItem}
                                        keyExtractor={(item) => item.id}
                                        showsVerticalScrollIndicator={false}
                                        ListEmptyComponent={
                                            <Text style={styles.emptyText}>
                                                {users === null ? 'Loading...' : 'No users available'}
                                            </Text>
                                        }
                                    />
                                )}
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
                                    (!selectedUser || !transferQuantity || isLoadingUsers) && styles.disabledButton
                                ]}
                                onPress={handleTransfer}
                                disabled={!selectedUser || !transferQuantity || isLoadingUsers}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 150,
    },
    loadingText: {
        color: 'white',
        marginTop: 10,
        fontSize: 14,
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
    // FIXED: Added proper styling for user avatar image
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
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
        padding: 30,
    },
});