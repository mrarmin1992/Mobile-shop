import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import {
  NativeBaseProvider,
  Box,
  HStack,
  Icon,
  Input,
  Text,
  ScrollView,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

const data = require("../../assets/data/products.json");
const productCategories = require("../../assets/data/categories.json");

var { width } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState(-1);
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setCategories(productCategories);
    setProductsCtg(data);
    setInitialState(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setCategories([]);
      setProductsCtg([]);
      setInitialState([]);
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => setFocus(true);
  const onBlur = () => setFocus(false);

  // 🛠️ Popravljeno filtriranje kategorija
  const changeCtg = (ctg) => {
    console.log("Selected category:", ctg); // Debugging

    if (ctg === "all") {
      setProductsCtg(initialState);
      setActive(-1);
    } else {
      const filteredProducts = products.filter((i) => i.category.$oid === ctg);

      console.log("Filtered products:", filteredProducts);
      setProductsCtg(filteredProducts);

      // ✅ Ako nema proizvoda, resetujemo aktivnu kategoriju
      if (filteredProducts.length === 0) {
        setActive(-1);
      } else {
        setActive(ctg);
      }
    }
  };

  return (
    <NativeBaseProvider>
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
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus && (
            <Icon
              as={Ionicons}
              name="close"
              size="md"
              color="gray.500"
              onPress={onBlur}
            />
          )}
        </HStack>
      </Box>

      {/* Prikaz proizvoda */}
      <View style={{ backgroundColor: "gainsboro", flex: 1, width: width }}>
        {focus ? (
          <SearchedProduct
            productsFiltered={productsFiltered}
            navigation={props.navigation}
          />
        ) : (
          <ScrollView>
            <View>
              <Banner />
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productsCtg={productsCtg}
                active={active}
                setActive={setActive}
              />

              {productsCtg.length > 0 ? (
                <View style={styles.container}>
                  {productsCtg.map((item) => (
                    <ProductList
                      key={item._id.$oid}
                      item={item}
                      navigation={props.navigation}
                    />
                  ))}
                </View>
              ) : (
                <View style={styles.center}>
                  <Text style={{ paddingTop: 100, fontWeight: "bold" }}>
                    No products found
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
    flexDirection: "row",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
