import HeaderAuth from '@/components/AuthComponents/HeaderAuth';
import TransactionCard from '@/components/InformationComponents/TransactionCard';
import PurchaseCard from '@/components/TransactionsComponents/PurchaseCard';
import Search from '@/components/TransactionsComponents/Search';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView, Text, View, FlatList } from 'react-native';
import { useAuthContext } from '@/context/AuthContext';
import CenteredSpinner from '@/components/Loading';
const TransactionsScreen = () => {
    const [isHandlingData, setIsHandlingData] = useState(false);
    const { userDetails } = useAuthContext();
    const [purchases, setPurchases] = useState([]);
    const [filteredPurchases, setFilteredPurchases] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [transactions, setTransactions] = useState([]);
    const handleData = async () => {
        try {
            setIsHandlingData(true);
            const responseTransactions = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/transaction/${userDetails?.id}`);
            setTransactions(responseTransactions?.data?.transactions);
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/purchase/${userDetails?.id}`);
            setPurchases(response?.data?.purchases);
            setFilteredPurchases(response?.data?.purchases);
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            setIsHandlingData(false);
        }
    };
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPurchases(purchases);
        } else {
            const filtered = purchases.filter((item: any) =>
                item.title?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPurchases(filtered);
        }
    }, [searchQuery, purchases]);
    useEffect(() => {
        handleData();
    }, []);
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };
    if (isHandlingData) {
        return <CenteredSpinner />;
    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: 'black' }}>
            <HeaderAuth message={'Here you will find all your transactions!'} title={'Users Transactions'} />
            <ScrollView horizontal={true}
                style={{ paddingLeft: 7 }}
                contentContainerStyle={{ columnGap: 12 }}
                showsHorizontalScrollIndicator={false}>
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
            <View style={{ marginVertical: 20, paddingBottom: 135, paddingHorizontal: 13 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Purchases</Text>
                <Search onSearch={handleSearch} />
                <View>
                    {filteredPurchases.length === 0 ? (
                        <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>
                            {searchQuery ? 'No purchases found matching your search.' : 'No purchases available.'}
                        </Text>
                    ) : (
                        <FlatList
                            data={filteredPurchases}
                            renderItem={({ item }: { item: any }) => (
                                <PurchaseCard
                                    image={item.image}
                                    title={item.title}
                                    icon={item.icon}
                                    salary={item.new_salary}
                                    available={item.available}
                                    productId={item.product_id}
                                />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled={false}
                            contentContainerStyle={{ rowGap: 15 }}
                        />
                    )}
                </View>
            </View>
        </ScrollView>
    );
};
export default TransactionsScreen;