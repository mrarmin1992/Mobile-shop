import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base"; 

import Header from "./Shared/Header";
import ProductContainer from "./Screens/Products/ProductContainer";
import Main from "./Navigators/Main";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer> 
          <Header />
          <Main />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
