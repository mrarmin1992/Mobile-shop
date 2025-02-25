import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
  Text
} from "react-native";
import ProductList from "./ProductList";

const data = require('../../assets/data/products.json');
var { width } = Dimensions.get("window"); 

const ProductContainer = () => {

    const [products, setProducts ] = useState([]);

    useEffect(() => {
        setProducts(data);

        return () => {
            setProducts([]);
        }
    }, [])

    return (
        <View style = {{ backgroundColor: 'gainsboro', width: '100%' }}>
            <Text style = {{ marginTop: 25, textAlign: 'center' }}>Products</Text>
            <View style = {{ marginTop: 40 }}>
            <FlatList 
                data={products}
                renderItem={({item}) => <ProductList
                key = {item.id} 
                item = {item}
                />}
                keyExtractor={item => item.name}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
            </View>
        </View>
    )
}
export default ProductContainer;