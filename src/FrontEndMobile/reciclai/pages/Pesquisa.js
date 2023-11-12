import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTodosUsuarios } from '../services/Usuarios.services';
import Container from '../components/Container';
import Card from '../components/Card';
import Body from '../components/Body';
import Logo from '../components/Logo';

const BuscaColetor = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuarios = await getTodosUsuarios();
        if (usuarios) {
          const coletores = usuarios.filter((usuario) => usuario.perfil === 1);
          setData(coletores);
        }
      } catch (error) {
        console.error('Erro ao carregar o usuário:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleSubmit = (index) => {
    navigation.navigate('Formulario', { data: data[index] });
  };

  return (
    <Container>
      <Logo />
      <Body>
        <View style={styles.container}>
          <Text style={styles.titulo}>Busca de Coletores</Text>
          <Card>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por Estado"
              value={searchInput}
              onChangeText={(text) => setSearchInput(text)}
            />
          </Card>
          <Card>
            <ScrollView>
              {data
                .filter((usuario) =>
                  usuario.estado.toLowerCase().includes(searchInput.toLowerCase())
                )
                .map((usuario, index) => (
                  <TouchableOpacity
                    key={usuario.id}
                    style={styles.itemContainer}
                    onPress={() => handleSubmit(index)}
                  >
                    <View style={styles.column}>
                      <Text style={styles.itemTitle}>Nome:</Text>
                      <Text style={styles.itemText}>{usuario.nome}</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.itemTitle}>Estado:</Text>
                      <Text style={styles.itemText}>{usuario.estado}</Text>
                    </View>
                    <Text style={styles.selectText}>Selecionar</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </Card>
        </View>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 10,
    color: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemText: {
    marginBottom: 5,
  },
  selectText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default BuscaColetor;
