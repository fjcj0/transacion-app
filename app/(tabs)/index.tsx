import AddTransactionButton from '@/components/InformationComponents/AddTransactionButton';
import HeaderInformation from '@/components/InformationComponents/HeaderInformation';
import IncomeCard from '@/components/InformationComponents/IncomeCard';
import Money from '@/components/InformationComponents/Money';
import SpendingCard from '@/components/InformationComponents/SpendingCard';
import TransactionCard from '@/components/InformationComponents/TransactionCard';
import { incomes, spendings, transactions } from '@/constants/data';
import { profilePicture } from '@/constants/imags';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
const InformationScreen = () => {
    return (
        <ScrollView
            contentContainerStyle={styles.containerInformation}
            style={{ backgroundColor: 'black' }}
            showsVerticalScrollIndicator={false}
        >
            <HeaderInformation name='Omar' profilePicture={profilePicture} />
            <Money percentPurchase={40} money={5000} />
            <View style={{ marginVertical: 20 }}>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={styles.containerTransactions}
                    showsHorizontalScrollIndicator={false}
                >
                    <AddTransactionButton />
                    {transactions.map((transaction, index) => (
                        <TransactionCard
                            key={index}
                            backgroundColor={transaction.backgroundColor}
                            color={transaction.color}
                            title={transaction.title}
                            money={transaction.money}
                            percent={transaction.percent}
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
                        incomes.map((income, index) => (
                            <IncomeCard
                                key={index}
                                title={income.title}
                                icon={income.icon}
                                value={income.value} />
                        ))
                    }
                </ScrollView>
            </View>
            <View style={styles.containerSpending}>
                <Text style={styles.firstTextStyleHeaderSpendingContainer}>
                    April <Text style={styles.secondTextStyleHeaderSpendingContainer}>Spending</Text>
                </Text>
                <View style={styles.spendingList}>
                    {spendings.map((spend, index) => (
                        <SpendingCard
                            key={index}
                            title={spend.title}
                            date={spend.date}
                            value={spend.value}
                            icon={spend.icon} />
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