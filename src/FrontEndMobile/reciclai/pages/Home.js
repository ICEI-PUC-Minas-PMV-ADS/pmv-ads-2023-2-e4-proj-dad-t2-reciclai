import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import Pesquisa from './Pesquisa'; 
import AposLogin from './AposLogin'; 
import VerPedido from './VerPedido';
import CadastroUsuario from './CadastroUsuario';
import Login from './Login';
import FormularioPedidos from './FormularioPedidos';
import PerfilUsuario from './PerfilUsuario';

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'aposLogin', title: 'Início', focusedIcon: 'home' },
    { key: 'pesquisa', title: 'Pesquisa', focusedIcon: 'file-search-outline'},
    { key: 'formularioPedidos', title: 'Fazer Pedido', focusedIcon: 'album' },
    { key: 'perfilUsuario', title: 'PerfilUsuario', focusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    pesquisa: Pesquisa,
    aposLogin: AposLogin,
    cadastroUsuario: CadastroUsuario,  
    formularioPedidos: FormularioPedidos,
    perfilUsuario:PerfilUsuario
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