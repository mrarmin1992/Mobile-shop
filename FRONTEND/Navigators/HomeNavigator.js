import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import ProductContainer from "../Screens/Products/ProductContainer";
import SingleProduct from "../Screens/Products/SingleProduct";

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Home" component={ProductContainer} />
      <Stack.Screen options={{ headerShown: false }} name="Product Detail" component={SingleProduct} />
    </Stack.Navigator>
  );
}
