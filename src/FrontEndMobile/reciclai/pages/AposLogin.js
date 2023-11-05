import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Headline, List } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

import Card from '../components/Card';
import { getTodosPedidos } from '../services/Pedidos.services';
import Container from '../components/Container';
import Body from '../components/Body';

const AposLogin = () => {

  const isFocused = useIsFocused();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getTodosPedidos().then((data) => {

      setPedidos(data);
    })
  }, [isFocused]);


  const ItemView = ({ item }) => {
    console.log(item);
    return (
      <List.Item
        title={item.nomeSolicitante}
      />
    )
  }

  return (
    <Container>
      <Body>

      <View style={styles.headline}>
        <Headline style={styles.headline2}>Olá,</Headline>
      </View>

      
        <ScrollView>

          <Text style={styles.titulo}>Meus Pedidos:</Text>
          <Card>
            <FlatList
              data={pedidos}
              keyExtractor={item => item.id}
              renderItem={ItemView}
            />
          </Card>

        </ScrollView>
      </Body>
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

