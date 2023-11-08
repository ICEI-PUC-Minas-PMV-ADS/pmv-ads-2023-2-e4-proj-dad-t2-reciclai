import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getPedidos, updatePedidos } from '../services/Pedidos.services';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

import Text1 from '../components/Text';
import Text2 from '../components/Text2';
import Container from '../components/Container';
import Card from '../components/Card';
import Body from '../components/Body';
import Titulo from '../components/Titulo';
import Button1 from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';
import Logo from '../components/Logo';


const VerPedido = ({ route }) => {
    const { item } = route.params ? route.params : {};
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [nomeSolicitante, setNomeSolicitante] = useState('');
    const [dataColeta, setDataColeta] = useState('');
    const [endereco, setEndereco] = useState('');
    const [lixoPerigoso, setLixoPerigoso] = useState();
    const [descricao, setDescricao] = useState();
    const [tipoLixo, setTipoLixo] = useState();
    const [status, setStatus] = useState();
    const [quantidadeLixo, setQuantidadeLixo] = useState();

    const Status =
        [
            'Processando',
            'Pedido Aceito',
            'Pedido Cancelado'
        ];

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

    const isFocused = useIsFocused();

    useEffect(() => {
        fetchPedidos();
        editarPedido();
    }, [isFocused])

    async function fetchPedidos() {

        console.log(item)
        const res = await getPedidos(item.id)
        console.log(res)
        setId(res.id)
        setNomeSolicitante(res.nomeSolicitante)
        setDataColeta(res.dataColeta)
        setEndereco(res.endereco)
        setLixoPerigoso(res.lixoPerigoso)
        setDescricao(res.descricao)
        setTipoLixo(res.tipoLixo)
        setStatus(res.status)
        setQuantidadeLixo(res.quantidadeLixo)

    };

    async function editarPedido() {
        await updatePedidos(item.id).then(res => {
            if (item) {
                setId(res.id)
                setNomeSolicitante(res.nomeSolicitante)
                setDataColeta(res.dataColeta)
                setEndereco(res.endereco)
                setLixoPerigoso(res.lixoPerigoso)
                setDescricao(res.descricao)
                setTipoLixo(res.tipoLixo)
                setStatus(res.status)
                setQuantidadeLixo(res.quantidadeLixo)
            }
        })
    }

    async function handleAceitar(event) {
        event.preventDefault();
        if (item.id) {
            await updatePedidos({
                "id": item.id,
                "idSolicitante": item.idSolicitante,
                "idColetor": item.idColetor,
                "nomeSolicitante": item.nomeSolicitante,
                "dataColeta": item.dataColeta,
                "endereco": item.endereco,
                "lixoPerigoso": item.lixoPerigoso,
                "descricao": item.descricao,
                "tipoLixo": item.tipoLixo,
                "status": 1,
            });

        }
    }

    async function handleCancelar(event) {
        event.preventDefault();
        if (item.id) {
            await updatePedidos({
                "id": item.id,
                "idSolicitante": item.idSolicitante,
                "idColetor": item.idColetor,
                "nomeSolicitante": item.nomeSolicitante,
                "dataColeta": item.dataColeta,
                "endereco": item.endereco,
                "lixoPerigoso": item.lixoPerigoso,
                "descricao": item.descricao,
                "tipoLixo": item.tipoLixo,
                "status": 2,
            });


        }
    }


    return (
        <Container>
            <ScrollView>
               
        <Logo />
        
                <Body>
                    <Card>
                        <Titulo title={"Número do pedido: "+ id} />
                       
                        <Text1 title="Nome: " />
                        <Text2 name={nomeSolicitante} />

                        <Text1 title="Endereço: " />
                        <Text2 name={endereco} />

                        <Text1 title="Descrição:" />
                        <Text2 name={descricao} />

                        <Text1 title="Data da Coleta: " />
                        <Text2 name={dataColeta} />

                        <Text1 title="Tipo de Lixo: " />
                        <Text2 name={TipoLixo[tipoLixo]} />

                        <Text1 title="Quantidade: " />
                        <Text2 name={quantidadeLixo} />

                        <Text1 title="Status: " />
                        <Text2 name={Status[status]} />

                        <View style={styles.button}>
                            <ButtonIcon onPress={handleAceitar} icon="check" title="Aceitar" theme={{ colors: { primary: '#24926D' }}}/>
                            <ButtonIcon onPress={handleCancelar} icon="trash-can" title="Cancelar" theme={{ colors: { primary: '#a51b0b' } }} />
                        </View>
                    </Card>

                    <Button1
                        onPress={() => navigation.goBack()} title="Voltar"
                    />

                </Body>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row"
    },
    logo: {
        alignItems: 'center',
        marginTop: 10,
      }
}
);



export default VerPedido;