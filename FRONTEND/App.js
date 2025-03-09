import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base"; 
import Header from "./Shared/Header";
import Main from "./Navigators/Main";
import { LogBox } from 'react-native';

// Redux
import { Provider } from 'react-redux'
import { store } from './Redux/store'

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
