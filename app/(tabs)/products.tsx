import ProductCard from '@/components/ProductsComponents/ProductCard';
import Search from '@/components/ProductsComponents/Search';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import CenteredSpinner from '@/components/Loading';
const ProductsScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<any>([]);
    const [filteredProducts, setFilteredProducts] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const handleProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/product`);
            setProducts(response?.data?.products);
            setFilteredProducts(response?.data?.products);
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
        finally {
            setIsLoading(false);
        }
    }
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product: any) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };
    useEffect(() => {
        handleProducts();
    }, []);
    if (isLoading) {
        return (
            <CenteredSpinner />
        );
    }
    return (
        <View style={styles.container}>
            <Search
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                <View style={styles.productsContainer}>
                    {filteredProducts.map((product: any, index: number) => (
                        <View key={index} style={styles.productCardWrapper}>
                            <ProductCard
                                title={product.title}
                                available={product.quantity}
                                salary={product.salary}
                                icon={product.company_icon}
                                image={product.image}
                            />
                        </View>
                    ))}
                    {filteredProducts.length === 0 && searchQuery !== '' && (
                        <View style={styles.noResultsContainer}>
                            <Text style={styles.noResultsText}>
                                No products found for {searchQuery}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
export default ProductsScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingBottom: 110,
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
        paddingVertical: 10,
    },
    productCardWrapper: {
        width: '48%',
        marginBottom: 10,
    },
    noResultsContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    noResultsText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});