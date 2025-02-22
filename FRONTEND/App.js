import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoList from './components/ToDoList';

import ProductContainer from './Screens/Products/ProductContainer'

export default function App() {
  return (
    <View style={styles.container}>
       <ProductContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
