import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Headline, List } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import Card from '../components/Card';
import { getTodosPedidos } from '../services/Pedidos.services';
import Container from '../components/Container';
import Body from '../components/Body';
import ButtonPedido from '../components/ButtonPedido';

const AposLogin = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [pedidos, setPedidos] = useState([]);

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
    getTodosPedidos().then((data) => {

      setPedidos(data);
    })
  }, [isFocused]);


  const ItemView = ({ item }) => {
    console.log(item);
    return (
      <Card>
      <List.Item
        title={'Nome: '+ item.nomeSolicitante}
        description={'Tipo: '+ TipoLixo[item.tipoLixo]}
        left={(props) => (
          <List.Icon
            {...props}
            color={'#24926D'}
            icon="form-select"
          />)}
        right={(props) => (
          <Text {...props} style={{ alignSelf: 'center' }}>
            {' '}
            {item.dataColeta}{' '}
          </Text>
        )}
        onPress={() => navigation.navigate('VerPedido', { item })}
      />
      </Card>
    )
  }

  return (
    <Container>
      <ScrollView>
      <Body>

      <View style={styles.headline}>
        <Headline style={styles.headline2}>Olá,</Headline>
      </View>
      <ButtonPedido icon="plus" title="Coleta" theme={{ colors: { primary: '#FFFFFF' }}} onPress={() => navigation.navigate('Pesquisa')}/>
     
          <Text style={styles.titulo}>Meus Pedidos:</Text>
          
            <FlatList
              data={pedidos}
              keyExtractor={item => item.id}
              renderItem={ItemView}
            />
      </Body>
      </ScrollView>
    </Container>
  );

}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 25,
    color: '#FFFFFF',
    marginLeft: 10,
  }, 
  headline:{
    marginTop: 50,
    marginBottom: 30,
    marginLeft: 10,
  },
  headline2: {
    color: '#FFFFFF',
  }
});

export default AposLogin;

