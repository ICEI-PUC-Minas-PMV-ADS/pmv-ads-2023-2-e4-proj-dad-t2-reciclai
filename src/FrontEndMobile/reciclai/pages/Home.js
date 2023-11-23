import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import Pesquisa from './Pesquisa'; 
import AposLogin from './AposLogin'; 
import CadastroUsuario from './CadastroUsuario';
import PerfilUsuario from './PerfilUsuario';
import Historico from './Historico';

const Home = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'aposLogin', title: 'Início', focusedIcon: 'home' },
    { key: 'pesquisa', title: 'Pesquisa', focusedIcon: 'file-search-outline'},
    { key: 'perfilUsuario', title: 'Perfil', focusedIcon: 'account' },
    {key: 'historico', title:'Histórico', focusedIcon:'format-list-bulleted'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    pesquisa: Pesquisa,
    aposLogin: AposLogin,
    cadastroUsuario: CadastroUsuario,
    perfilUsuario:PerfilUsuario, 
    historico: Historico
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