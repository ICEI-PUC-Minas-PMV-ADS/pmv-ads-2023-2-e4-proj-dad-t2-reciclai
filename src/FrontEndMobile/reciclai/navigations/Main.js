import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Pesquisa from '../pages/Pesquisa';
import AposLogin from '../pages/AposLogin';


const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AposLogin"
        component={AposLogin}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Pesquisa"
        component={Pesquisa}
        options={{
          header: () => null,
        }}
      />


    </Stack.Navigator>

  );
};

export default Main;