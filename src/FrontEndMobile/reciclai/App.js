import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import UserProvider from './contexts/UserContext';
import Route from './navigations/Route';


const App = () => {
  return (
    <UserProvider>
    <NavigationContainer>
      <Route />
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;