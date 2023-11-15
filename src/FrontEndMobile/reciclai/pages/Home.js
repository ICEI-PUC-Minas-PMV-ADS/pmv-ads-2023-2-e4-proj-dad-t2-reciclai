import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import Pesquisa from './Pesquisa'; 
import AposLogin from './AposLogin'; 
import VerPedido from './VerPedido';
import CadastroUsuario from './CadastroUsuario';
import Login from './Login';
import FormularioPedidos from './FormularioPedidos';

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'pesquisa', title: 'Pesquisa', focusedIcon: 'file-search-outline'},
    { key: 'aposLogin', title: 'AposLogin', focusedIcon: 'album' },
    { key: 'cadastroUsuario', title: 'CadastroUsuario', focusedIcon: 'album' },
    { key: 'login', title: 'Login', focusedIcon: 'key' },
    { key: 'formularioPedidos', title: 'FormularioPedidos', focusedIcon: 'album' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    pesquisa: Pesquisa,
    aposLogin: AposLogin,
    cadastroUsuario: CadastroUsuario,
    login: Login,     
    formularioPedidos: FormularioPedidos
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Home;