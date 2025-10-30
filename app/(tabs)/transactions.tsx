import HeaderAuth from '@/components/AuthComponents/HeaderAuth';
import TransactionCard from '@/components/InformationComponents/TransactionCard';
import PurchaseCard from '@/components/TransactionsComponents/PurchaseCard'; // Make sure to import your PurchaseCard
import Search from '@/components/TransactionsComponents/Search';
import { transactions, purchases } from '@/constants/data'; // Import purchases
import React from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
const TransactionsScreen = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: 'black' }}>
            <HeaderAuth message={'Here you will find all your transactions!'} title={'Users Transactions'} />

            <ScrollView horizontal={true}
                contentContainerStyle={{ columnGap: 12 }}
                showsHorizontalScrollIndicator={false}>
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
            <View style={{ marginVertical: 20, paddingBottom: 135 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Purchases</Text>
                <Search />
                <View style={{ marginTop: 15 }}>
                    <FlatList
                        data={purchases}
                        renderItem={({ item }) => (
                            <PurchaseCard
                                image={item.image}
                                title={item.title}
                                icon={item.icon}
                                salary={item.new_salary}
                                available={item.available}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={false}
                        contentContainerStyle={{ rowGap: 15 }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};
export default TransactionsScreen;