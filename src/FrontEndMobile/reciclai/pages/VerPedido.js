import React, { useState, useEffect, StyleSheet } from 'react';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getPedidos } from '../services/Pedidos.services';
import { useNavigation } from '@react-navigation/native';

import Text1 from '../components/Text';
import Text2 from '../components/Text2';
import Container from '../components/Container';
import Card from '../components/Card';
import Body from '../components/Body';
import Titulo from '../components/Titulo';
import Button1 from '../components/Button';


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
        fetchPedidos()
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


    return (
        <Container>
            <ScrollView>

                <Body>
                    <Titulo title={'Número do Pedido: ' + id} />
                    <Card>
                        <Text1 title="Nome: " />
                        <Text2 name={nomeSolicitante} />
                    </Card>
                    <Card>
                        <Text1 title="Descrição:" />
                        <Text2 name={descricao} />
                    </Card>
                    <Card>
                        <Text1 title="Data da Coleta: " />
                        <Text2 name={dataColeta} />
                    </Card>
                    <Card>
                        <Text1 title="Tipo de Lixo: " />
                        <Text2 name={TipoLixo[tipoLixo]} />
                    </Card>
                    <Card>
                        <Text1 title="Quantidade: " />
                        <Text2 name={quantidadeLixo} />
                    </Card>
                    <Button1
                        onPress={() => navigation.goBack()} title="Voltar"
                    />



                </Body>
            </ScrollView>
        </Container>
    );
}




export default VerPedido;