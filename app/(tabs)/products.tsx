import ProductCard from '@/components/ProductsComponents/ProductCard';
import Search from '@/components/ProductsComponents/Search';
import { products } from '@/constants/data';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const ProductsScreen = () => {
    return (
        <View style={styles.container}>
            <Search />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                <View style={styles.productsContainer}>
                    {products.map((product, index) => (
                        <View key={index} style={styles.productCardWrapper}>
                            <ProductCard
                                title={product.title}
                                available={product.available}
                                salary={product.salary}
                                icon={product.companyIcon}
                                image={product.image}
                            />
                        </View>
                    ))}
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
});