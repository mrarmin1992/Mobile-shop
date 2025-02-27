import React, { useState, useEffect } from "react";
import { View, FlatList, Dimensions } from "react-native";
import { NativeBaseProvider, Box, HStack, Icon, Input, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";

const data = require("../../assets/data/products.json");
var { width } = Dimensions.get("window");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    return () => {
      setProducts([]);
      setProductsFiltered([]);
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  return (
    <NativeBaseProvider>
      {/* Search Bar */}
      <Box bg="white" p={5}>
        <HStack
          space={3}
          alignItems="center"
          borderWidth={1}
          borderColor="gray.300"
          px={3}
          py={2}
          borderRadius={20}
        >
          <Icon as={Ionicons} name="search" size="md" color="gray.500" />
          <Input
            flex={1}
            placeholder="Search"
            variant="unstyled"
            size="md"
            onFocus={() => setFocus(true)}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus && (
            <Icon as={Ionicons} name="close" size="md" color="gray.500" onPress={() => setFocus(false)} />
          )}
        </HStack>
      </Box>

      {/* Prikaz proizvoda */}
      <View style={{ backgroundColor: "gainsboro", flex: 1, width: width }}>
        {/* Kada je fokusiran search, prikazi filtrirane proizvode */}
        {focus ? (
          <View style={{ position: "absolute", backgroundColor: "white", width: width }}>
            <SearchedProduct productsFiltered={productsFiltered} />
          </View>
        ) : (
          <>
            <Text style={{ marginTop: 25, textAlign: "center" }}>Products</Text>
            <View style={{ marginTop: 40 }}>
              <FlatList
                data={products}
                renderItem={({ item }) => <ProductList key={item._id.$oid} item={item} />}
                keyExtractor={(item) => item._id.$oid}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
              />
            </View>
          </>
        )}
      </View>
    </NativeBaseProvider>
  );
};

export default ProductContainer;
