import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Headline, List } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from "../contexts/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';


import Card from '../components/Card';
import ButtonLogout from '../components/ButtonLogout';
import { getTodosPedidos } from '../services/Pedidos.services';
import Container from '../components/Container';
import Body from '../components/Body';
import ButtonPedido from '../components/ButtonPedido';

const AposLogin = () => {
  const navigation = useNavigation();
  const {  setSigned, name, idUsuario, setUserId } = useUser();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  const TipoLixo =
    [
      'Eletrodomestico',
      'Eletroportateis',
      'Monitores',
      'Iluminação',
      'Fios e cabos',
      'Pilhas e baterias',
      'TI e telecomunicações',
      'Painéis Fotovoltaicos'
    ];

  useEffect(() => {
    async function fetchPedidos() {
      const data = await getTodosPedidos();
      if (data) {

        let PedidosUsuario = data.filter((pedido) => pedido.idSolicitante == idUsuario || pedido.idColetor == idUsuario);
        setData(PedidosUsuario);
        console.log(PedidosUsuario);
      }
    }
  
    fetchPedidos();
  }, [isFocused]);


  const ItemView = ({ item }) => {
  
    return (
      
        <List.Item
          title={'Número do pedido: ' + item.id}
          description={(props) => (
            <Text {...props} style={{ marginTop: 10 }}>
              Data: {' '}
              {item.dataColeta}
            </Text>
          )}
         
          left={(props) => (
            <List.Icon
              {...props}
              color={'#24926D'}
              icon="form-select"
            />)}

          onPress={() => navigation.navigate('VerPedido', { item })}
        />
   
    )
  }

  const handleLogout = async () => {
    setSigned(false);
    setUserId(null);
    AsyncStorage.removeItem('jwtToken');

  }

  return (
    <Container>
    
        <Body>

          <View style={styles.headline}>
            <Headline style={styles.headline2}>Olá, {name}!</Headline>
          </View>
       
          <ButtonLogout onPress={handleLogout} />
          <ButtonPedido icon="plus"  theme={{ colors: { primary: '#FFFFFF' } }} onPress={() => navigation.navigate('Pesquisa')} />
         
          < Text style={styles.titulo}>Meus Pedidos:</Text>
          
<Card>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={ItemView}
        />
        </Card>
      </Body>
  
    </Container >
  );

}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 25,
    color: '#FFFFFF',
    marginLeft: 10,
    marginTop:25,
    marginBottom: 15,
  },
  headline: {
    marginTop: 50,
    marginBottom: 30,
    marginLeft: 10,
  },
  headline2: {
    color: '#FFFFFF',
  }
});

export default AposLogin;

