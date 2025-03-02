import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { NativeBaseProvider, Box, HStack, VStack, Image, Text, Pressable } from "native-base";

var { width } = Dimensions.get("window");

const SearchedProduct = (props) => {
    const { productsFiltered } = props;
    
    return (
        <NativeBaseProvider style={{ width: width }}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => (
                    <Pressable key={item?._id.$oid} onPress={() => console.log("Product Clicked")}>
                        <HStack space={3} alignItems="center" padding={3} borderBottomWidth={1} borderColor="gray.200">
                            <Image 
                                source={{ uri: item.image || 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }}
                                alt="Product Image"
                                size="md"
                                borderRadius={5}
                            />
                            <VStack>
                                <Text bold>{item.name}</Text>
                                <Text fontSize="xs" color="gray.500">{item.description}</Text>
                            </VStack>
                        </HStack>
                    </Pressable>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: 'center' }}>
                        No product matches the selected criteria
                    </Text>
                </View>
            )}
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SearchedProduct;
