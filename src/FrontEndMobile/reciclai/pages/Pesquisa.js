import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const BuscaColetor = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
 
    const usuarios = [
      { id: 1, nome: 'Maria José da Silva', email: 'maria@maria.com', estado: 'Minas Gerais', perfil: 1 },
      { id: 2, nome: 'José Maria da Silva ', email: 'jose@jose.com', estado: 'São Paulo', perfil: 1 },
      { id: 3, nome: 'Cláudia Divina de Jesus', email: 'paulo@paulo.com', estado: 'Maranhão', perfil: 1 },
      { id: 4, nome: 'Carol Santos', email: 'jose@jose.com', estado: 'Piauí', perfil: 1 },
    ];
    const coletores = usuarios.filter((usuario) => usuario.perfil === 1);
    setData(coletores);
  }, []);

  const handleSubmit = (index) => {
    const selectedData = data[index];
    console.log(selectedData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Busca de Coletores</Text>
      <View style={styles.box}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por Estado"
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 10,
  },
  box: {
    width: '100%',
    alignItems: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '90%',
    marginTop: "auto", 
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  },
});

export default BuscaColetor;