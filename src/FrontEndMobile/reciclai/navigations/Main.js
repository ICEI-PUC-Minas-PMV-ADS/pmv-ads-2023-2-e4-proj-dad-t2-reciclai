import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Pesquisa from '../pages/Pesquisa';
import AposLogin from '../pages/AposLogin';
import VerPedido from '../pages/VerPedido';
import FormularioPedidos from '../pages/FormularioPedidos';
import Historico from '../pages/Historico';
import CadastroUsuario from '../pages/CadastroUsuario';
import PerfilUsuario from '../pages/PerfilUsuario';



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
        name="VerPedido"
        component={VerPedido}
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
      <Stack.Screen
        name="Histórico"
        component={Historico}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Formulario"
        component={FormularioPedidos}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="CadastroUsuario"
        component={CadastroUsuario}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="PerfilUsuario"
        component={PerfilUsuario}
        options={{
          header: () => null,
        }}
      />


    </Stack.Navigator>



  );
};

export default Main;