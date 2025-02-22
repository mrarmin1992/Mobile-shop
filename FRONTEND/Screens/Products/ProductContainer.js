import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import ProductList from './ProductList';

const data = require('../../assets/data/products.json');


const ProductContainer = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(data); // Postavi podatke iz JSON-a

        return () => {
            setProducts([]); // Resetuj kada se komponenta unmount-uje
        };
    }, []);

    return (
        <View>
            <Text>Product Container</Text>
            <View style={{ marginTop: 100 }}>
                <FlatList
                    horizontal
                    data={products} // ✅ Ispravljeno: "data", a ne "date"
                    renderItem={({ item }) => <ProductList 
                    key = {item.id}
                    item = {item}
                    />}
                    keyExtractor={(item, index) => index.toString()} // ✅ Siguran keyExtractor
                />
            </View>
        </View>
    );
};

export default ProductContainer;
