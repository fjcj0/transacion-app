import AddTransactionButton from '@/components/InformationComponents/AddTransactionButton';
import HeaderInformation from '@/components/InformationComponents/HeaderInformation';
import IncomeCard from '@/components/InformationComponents/IncomeCard';
import Money from '@/components/InformationComponents/Money';
import TransactionCard from '@/components/InformationComponents/TransactionCard';
import { incomes, transactions } from '@/constants/data';
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
        </ScrollView>
    );
}
export default InformationScreen;
const styles = StyleSheet.create({
    containerInformation: {
        flex: 1,
        backgroundColor: 'black',
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
});