import AddTransactionButton from '@/components/InformationComponents/AddTransactionButton';
import HeaderInformation from '@/components/InformationComponents/HeaderInformation';
import IncomeCard from '@/components/InformationComponents/IncomeCard';
import Money from '@/components/InformationComponents/Money';
import SpendingCard from '@/components/InformationComponents/SpendingCard';
import TransactionCard from '@/components/InformationComponents/TransactionCard';
import CenteredSpinner from '@/components/Loading';
import { profilePicture } from '@/constants/imags';
import { useAuthContext } from '@/context/AuthContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
const InformationScreen = () => {
    const { userDetails } = useAuthContext();
    const [transactions, setTransactions] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [losses, setLosses] = useState([]);
    const [isLoadingInformation, setIsLoadingInformation] = useState(false);
    const handleTransactions = async () => {
        try {
            if (userDetails?.id) {
                const responseTransactions = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/transaction/${userDetails?.id}`);
                setTransactions(responseTransactions?.data?.transactions);
            }
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    };
    const handleIncomes = async () => {
        try {
            setIsLoadingInformation(true);
            if (userDetails?.id) {
                const responseIncomes = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/auth/get-income/${userDetails?.id}`);
                setIncomes(responseIncomes?.data?.user_incomes);
            }
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    };
    const handleLosses = async () => {
        try {
            setIsLoadingInformation(true);
            if (userDetails?.id) {
                const responseLosses = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/auth/get-loss/${userDetails?.id}`);
                setLosses(responseLosses?.data?.user_losses);
            }
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    };
    useEffect(() => {
        try {
            if (userDetails?.id) {
                handleTransactions();
                handleIncomes();
                handleLosses();
            }
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            setIsLoadingInformation(false);
        }
    }, [userDetails?.id]);
    if (isLoadingInformation) {
        return (
            <CenteredSpinner />
        )
    }
    return (
        <ScrollView
            contentContainerStyle={styles.containerInformation}
            style={{ backgroundColor: 'black' }}
            showsVerticalScrollIndicator={false}
        >
            <HeaderInformation name={userDetails?.name || 'Omar'} profilePicture={userDetails?.profile_picture || profilePicture} />
            <Money percentPurchase={40} money={userDetails?.money || 500} />
            <View style={{ marginVertical: 20 }}>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={styles.containerTransactions}
                    showsHorizontalScrollIndicator={false}
                >
                    <AddTransactionButton />
                    {transactions.map((transaction: any, index: number) => (
                        <TransactionCard
                            key={index}
                            backgroundColor={transaction.background_color}
                            color={transaction.text_color}
                            title={transaction.product_title}
                            money={transaction.total_money_sent}
                            percent={transaction.purchase_percent}
                        />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.containerIncome}>
                <Text style={styles.firstTextStyleHeaderIncomeContainer}>
                    My <Text style={styles.secondTextStyleHeaderIncomeContainer}>Income</Text>
                </Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginTop: 10, columnGap: 15 }}>
                    {
                        incomes.map((income: any, index: number) => (
                            <IncomeCard
                                key={index}
                                title={income.title}
                                icon={income.icon_company}
                                value={income.profit} />
                        ))
                    }
                </ScrollView>
            </View>
            <View style={styles.containerSpending}>
                <Text style={styles.firstTextStyleHeaderSpendingContainer}>
                    My <Text style={styles.secondTextStyleHeaderSpendingContainer}>Spending</Text>
                </Text>
                <View style={styles.spendingList}>
                    {losses.map((loss: any, index: number) => (
                        <SpendingCard
                            key={index}
                            title={loss.title}
                            date={loss.created_at}
                            value={loss.loss}
                            icon={loss.icon_company} />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}
export default InformationScreen;
const styles = StyleSheet.create({
    containerInformation: {
        flexGrow: 1,
        backgroundColor: 'black',
        paddingBottom: 20,
    },
    containerTransactions: {
        paddingHorizontal: 20,
        columnGap: 10,
        alignItems: 'center',
    },
    containerIncome: {
        flexDirection: 'column',
        marginVertical: 20,
        rowGap: 10,
        paddingLeft: 20
    },
    firstTextStyleHeaderIncomeContainer: {
        color: 'white',
        fontWeight: '400',
        fontSize: 17,
    },
    secondTextStyleHeaderIncomeContainer: {
        color: 'white',
        fontWeight: 'bold',
    },
    containerSpending: {
        flexDirection: 'column',
        marginTop: 20,
        rowGap: 10,
        paddingLeft: 20,
        paddingBottom: 110,
    },
    spendingList: {
        marginTop: 10,
        rowGap: 15,
        paddingRight: 20
    },
    firstTextStyleHeaderSpendingContainer: {
        color: 'white',
        fontWeight: '400',
        fontSize: 17,
    },
    secondTextStyleHeaderSpendingContainer: {
        color: 'white',
        fontWeight: 'bold',
    },
});