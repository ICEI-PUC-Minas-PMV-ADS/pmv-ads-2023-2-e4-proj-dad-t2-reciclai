import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { List, RadioButton, Text } from 'react-native-paper';
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
    const [checked, setChecked] = useState('Aceito');
    const { idUsuario } = useUser();
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();



    useEffect(() => {
        async function fetchPedidos() {
            const pedidosUser = await getTodosPedidos();
            if (pedidosUser) {

                let PedidosUsuario = pedidosUser.filter((pedido) => pedido.idSolicitante == idUsuario || pedido.idColetor == idUsuario);
                setData(PedidosUsuario);
                console.log(PedidosUsuario);
            }
        }

        fetchPedidos();
    }, [isFocused]);


const searchPedidosAceitos = (item) => {
    if(item){
         const pedidosAceitos = data.filter(p => p.status == 1 )
         setData(pedidosAceitos)
         setChecked('Aceito');

    }}

    const searchPedidosCancelados = (item) => {
        if(item){
             const pedidosCancelados = data.filter(p => p.status == 2 )
             setData(pedidosCancelados)
             setChecked('Cancelado');

        }}
    


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
                <ScrollView>
                    < Text style={styles.titulo}>Histórico:</Text>

                    <View style={styles.radioButton}>
                        <View style={styles.radio1}>
                            <Text style={styles.labelRadio}>Aceitos</Text>
                            <RadioButton
                                value={1}
                                status={checked === 'Aceito' ? 'checked' : 'unchecked'}
                                onPress={searchPedidosAceitos}
                                theme={{ colors: { primary: '#4660BE' } }}
                            />
                        </View>
                        <View style={styles.radio1}>

                            <Text style={styles.labelRadio}>Cancelados</Text>
                            <RadioButton
                                value={2}
                                status={checked === 'Cancelado' ? 'checked' : 'unchecked'}
                                onPress={searchPedidosCancelados}
                                theme={{ colors: { primary: '#4660BE' } }}
                            />
                        </View>
                    </View>
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
                </ScrollView>
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
    labelRadio:{
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
    }
    
});


export default Historico;