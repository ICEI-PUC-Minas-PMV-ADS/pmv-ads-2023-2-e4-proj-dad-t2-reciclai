import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getTodosUsuarios } from '../services/Usuarios.services';
import Container from '../components/Container';
import CardPesquisa from '../components/CardPesquisa';
import Body from '../components/Body';
import Logo from '../components/Logo';
import Button from '../components/ButtonFormulario';


const BuscaColetor = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filtro, setFiltro] = useState('estado'); 

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

  const handleGoBack = () => {
    navigation.navigate('AposLogin');
  };


  return (
    <Container style={styles.container}>
      <Logo />
      <Body>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.titulo}>Busca de Coletores</Text>
            <View style={styles.radioButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  filtro === 'estado' && styles.radioButtonSelected,
                ]}
                onPress={() => setFiltro('estado')}
              >
                <Text style={styles.radioButtonText}>Filtrar por Estado</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  filtro === 'nome' && styles.radioButtonSelected,
                ]}
                onPress={() => setFiltro('nome')}
              >
                <Text style={styles.radioButtonText}>Filtrar por Nome</Text>
              </TouchableOpacity>
            </View>

            <CardPesquisa>
              <TextInput
                style={styles.searchInput}
                placeholder={
                  filtro === 'estado' ? 'Buscar por Estado' : 'Buscar por Nome'
                }
                value={searchInput}
                onChangeText={(text) => setSearchInput(text)}
              />
            </CardPesquisa>
            <CardPesquisa>
              {data
                .filter((usuario) =>
                  filtro === 'estado'
                    ? usuario.estado.toLowerCase().includes(searchInput.toLowerCase())
                    : usuario.nome.toLowerCase().includes(searchInput.toLowerCase())
                )
                .map((usuario, index) => (
                  <TouchableOpacity
                    key={usuario.id}
                    style={styles.itemContainer}
                    onPress={() => handleSubmit(index)}
                  >
                    <View style={styles.column}>
                      <Text style={styles.itemTitle}>Nome:</Text>
                      <Text style={styles.itemText}>
                        {usuario.nome.charAt(0).toUpperCase() + usuario.nome.slice(1)}
                      </Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.itemTitle}>Estado:</Text>
                      <Text style={styles.itemText}>{usuario.estado}</Text>
                    </View>
                    <Icon name="calendar-multiple-check" size={30} color={'#4660BE'}/>
                  </TouchableOpacity>
                ))}
            </CardPesquisa>
            <Button
              title="Voltar"
              theme={{ colors: { primary: '#FFFFFF' } }}
              onPress={handleGoBack}
            />
          </View>
        </ScrollView>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 10,
    color: '#fff',
  },
  searchCard: {
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: '#4660BE',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
  },

  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
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
    color: '#3498db',
    fontWeight: 'bold',
  },
  backButton: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  radioButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },

  radioButtonSelected: {
    backgroundColor: '#4660BE',
  },

  radioButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BuscaColetor;
