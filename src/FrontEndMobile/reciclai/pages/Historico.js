import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { List, RadioButton, Text, TextInput } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from "../contexts/UserContext";



import Card from '../components/Card';
import { getTodosPedidos } from '../services/Pedidos.services';
import Container from '../components/Container';
import Body from '../components/Body';
import Button1 from '../components/Button';
import Logo from '../components/Logo';


const Historico = () => {
    const navigation = useNavigation();
    const [checked, setChecked] = useState('Todos');
    const { idUsuario } = useUser();
    const [originalData, setOriginalData] = useState([]);
    const [data, setData] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const isFocused = useIsFocused();



    useEffect(() => {
        async function fetchPedidos() {
            try {

                const pedidosUser = await getTodosPedidos();
                if (pedidosUser) {

                    let PedidosUsuario = pedidosUser.filter((pedido) => pedido.idSolicitante == idUsuario || pedido.idColetor == idUsuario);
                    setData(PedidosUsuario);
                    setOriginalData(PedidosUsuario);
                    console.log(PedidosUsuario);
                }
            } catch (error) {
                console.error('Error fetching pedidos:', error);
            }


        }
        fetchPedidos();
    }, [isFocused]);

    const searchPedidos = (item) => {
        if (item) {
            const pedidos = originalData;
            setData(pedidos)
            setChecked('Todos');

        }
    }

    const searchPedidosAceitos = (item) => {
        if (item) {
            const pedidosAceitos = originalData.filter(p => p.status == 1)
            setData(pedidosAceitos)
            setChecked('Aceito');

        }
    }

    const searchPedidosCancelados = (item) => {
        if (item) {
            const pedidosCancelados = originalData.filter(p => p.status == 2)
            setData(pedidosCancelados)
            setChecked('Cancelado');

        }
    }

    const searchInput = (text) => {
        const pesquisaId = text.trim().toLowerCase(); 
        setPesquisa(text);
      
        if (pesquisaId || checked !== 'Todos') {
          const pedidosFiltered = originalData.filter((p) => {
            const idMatch = pesquisaId ? p.id.toString().toLowerCase().includes(pesquisaId) : true;
            const statusMatch =
              checked === 'Todos' || (checked === 'Aceito' && p.status === 1) || (checked === 'Cancelado' && p.status === 2);
            return idMatch && statusMatch;
          });
          setData(pedidosFiltered);
        } else {
          setData(originalData);
        }
      };

    const ItemView = ({ item }) => {

        return (

            <List.Item
                title={'Número do pedido: ' + item.id}

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


    return (
        <Container>
            <Logo />
            <Body>

                < Text style={styles.titulo}>Histórico:</Text>
           
                <View style={styles.radioButton}>
                <View style={styles.radio1}>
                        <Text style={styles.labelRadio}>Todos</Text>
                        <RadioButton
                            
                            status={checked === 'Todos' ? 'checked' : 'unchecked'}
                            onPress={searchPedidos}
                            theme={{ colors: { primary: '#4660BE' }, uncheckedColor: { primary: '#fff' } }}
                        />
                    </View>
                    <View style={styles.radio1}>
                        <Text style={styles.labelRadio}>Aceitos</Text>
                        <RadioButton
                           
                            status={checked === 'Aceito' ? 'checked' : 'unchecked'}
                            onPress={searchPedidosAceitos}
                            theme={{ colors: { primary: '#4660BE' }, uncheckedColor: { primary: '#fff' } }}
                        />
                    </View>
                    <View style={styles.radio1}>

                        <Text style={styles.labelRadio}>Cancelados</Text>
                        <RadioButton
                            
                            status={checked === 'Cancelado' ? 'checked' : 'unchecked'}
                            onPress={searchPedidosCancelados}
                            theme={{ colors: { primary: '#4660BE' } }}
                        />
                    </View>
                </View>
                <TextInput
                style={styles.searchInput}
                placeholder='Pesquisar número de pedido'
                value={pesquisa}
                onChangeText={(text) => searchInput(text)}
              />
                <Card>
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={ItemView}
                    />
                </Card>

                <Button1
                    onPress={() => navigation.navigate('AposLogin')} title="Voltar"
                />

            </Body>

        </Container>
    );
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 25,
        color: '#FFFFFF',
        marginLeft: 20,
        marginTop: 25,
        marginBottom: 15,
    },
    labelRadio: {
        color: '#FFF',
        fontSize: 15,

    },
    radioButton: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    radio1: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    searchInput: {
        borderColor: '#4660BE',
        backgroundColor: '#EDEBEB',
        width: '90%',
        borderRadius: 5,
        fontSize: 16,
        color: '#333',
        alignSelf: 'center',
        margin: 10,
      }

});


export default Historico;