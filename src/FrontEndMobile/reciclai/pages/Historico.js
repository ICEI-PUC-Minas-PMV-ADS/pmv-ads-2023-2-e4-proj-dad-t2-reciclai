import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
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

    const { idUsuario } = useUser();
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
});


export default Historico;