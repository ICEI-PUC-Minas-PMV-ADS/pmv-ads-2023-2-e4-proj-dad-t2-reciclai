import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Linking } from 'react-native';

import Container from '../components/Container';
import Body from '../components/Body';
import InputPedido from '../components/inputPedido';
import Logo from '../components/Logo';
import Button from '../components/ButtonFormulario';

import { useUser } from '../contexts/UserContext';
import { insertPedidos, insertUsuariosPedidos } from '../services/Pedidos.services';
import { getUsuario, enviarEmail } from '../services/Usuarios.services';

const FormularioPedidos = ({ route }) => {
    const { id, email } = route.params.data;
    const coletor = id;
    const emailColetor = email;
    const navigation = useNavigation();
    const { user } = useUser();
    const solicitante = user.userId;
    // console.log(user.userId);
    const [nomeSolicitante, setNomeSolicitante] = useState('');
    const [dataColeta, setDataColeta] = useState('');
    const [Aux1Coleta, setAux1Coleta] = useState(new Date());
    const [Aux2Coleta, setAux2Coleta] = useState(new Date());
    const [endereco, setEndereco] = useState('');
    const [lixoPerigoso, setLixoPerigoso] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tipoLixo, setTipoLixo] = useState('');
    const [status, setStatus] = useState('');
    const [qtdLixo, setQtdLixo] = useState();
    

    const handleChangeTipoLixo = (value) => {
        setTipoLixo(value);
    }
    function formattedDate(date) {
        let myDate;
        myDate = new Date(date)
        myDate.setMinutes(myDate.getMinutes() + myDate.getTimezoneOffset())

        return myDate;
    }

    function formattedDateTime(date1, date2) {
        let data;
        data = formattedDate(date1)
        data.setHours(date2.getHours())
        data.setMinutes(date2.getMinutes())
        data.setSeconds(date2.getSeconds())
        if (Platform.OS !== 'android') {
            data.setHours(data.getHours() - (data.getTimezoneOffset() / 60))
        }
        // console.log(data.getHours())
        // console.log(data.getTimezoneOffset())
        return data;
    }

    const handleChangeLixoPerigoso = (value) => {
        setLixoPerigoso(value);
        if (value === true) {
            alertaResiduo();
        
    }
}
    async function handleSubmit() {
        console.log(user.userPerfil);
        if (user.userPerfil == 0) {
            const novoPedido = await insertPedidos({
                "idSolicitante": solicitante,
                "idColetor": coletor,
                "nomeSolicitante": nomeSolicitante,
                "dataColeta": formattedDateTime(Aux1Coleta, Aux2Coleta),
                "endereco": endereco,
                "lixoPerigoso": lixoPerigoso,
                "descricao": descricao,
                "tipoLixo": parseInt(tipoLixo),
                "qtdLixo": parseInt(qtdLixo),
                "status": 0,
                //}).then(res => {
                //navigation.goBack();
                //console.log(res);
            });
            console.log(novoPedido.id);

            await insertUsuariosPedidos({
                "pedidoId": novoPedido.id,
                "usuarioId": solicitante
            });

            await insertUsuariosPedidos({
                "pedidoId": novoPedido.id,
                "usuarioId": coletor
            });

            await enviarEmail({
                "email": emailColetor,
                "perfil": user.userPerfil
            });

            Alert.alert('Formulário de pedidos', 'Seu pedido foi finalizado com sucesso', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } else {
            window.alert("Ocorreu um erro, você precisa ser do tipo 'solicitante' para realizar pedidos! — Clique em OK para ser redirecionado.");
        }
    }

    const handleNameChange = (e) => {
        setNomeSolicitante(e.target.value);
    }
    useEffect(() => {
        async function fetchUser() {
            const user = await getUsuario(solicitante);
            setNomeSolicitante(user.nome);
        }
        fetchUser();
    }, []);
    const alertaResiduo = () => {
        // Your alert logic here
        // For example:
        Alert.alert(
            "Atenção!",
            "Os tipos de resíduos perigosos que aceitamos são pilhas e baterias. Os demais tipos não são aceitos por nossos coletores. Para saber mais sobre resíduos perigosos e como descartá-los corretamente, clique em saber mais.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") },
                { text: "Saber mais", onPress: () => Linking.openURL("https://www.ufsm.br/pro-reitorias/proinfra/uma/2021/03/19/residuos-perigosos-o-que-sao-e-como-lidar-da-maneira-correta") },
            ],
            { cancelable: false }
        );
    };
    return (
        <Container>
            <ScrollView>
                <Logo />
                <Body>
                    <View style={styles.container}>
                        <Text style={styles.titulo} >Formulário de pedido</Text>

                        <InputPedido
                            label="Nome:"
                            value={nomeSolicitante}
                            onChange={handleNameChange}
                            keyboardType="default"
                            required
                        />
                        <View style={styles.uniao}>
                            <View style={styles.littleCard}>
                                {Platform.OS === 'android' ? (
                                    <Text style={styles.textLableInputAndroid}>Data da coleta</Text>
                                ) : (
                                    <Text style={styles.textLableInputIOS}>Data da coleta</Text>
                                )}
                                {/* O datePicker funciona nativamente apenas no Ios
                                    para android é preciso modificações */}
                                {Platform.OS === 'android' ? (
                                    <TouchableOpacity
                                        onPress={() =>
                                            DateTimePickerAndroid.open({
                                                mode: 'date',
                                                value: Aux1Coleta,
                                                onChange: (event, date) =>
                                                    event.type === 'set' ? setAux1Coleta(date) : null,
                                            })
                                        }
                                    >
                                        <View style={styles.textDateInput}>
                                            <Text style={{ color: 'grey' }}>{Aux1Coleta.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <RNDateTimePicker
                                        mode="date"
                                        value={Aux1Coleta}
                                        style={styles.dateIOS}
                                        onChange={(event, date) => setAux1Coleta(date)}
                                    />
                                )}
                            </View>
                            <View style={styles.littleCard}>
                                {Platform.OS === 'android' ? (
                                    <Text style={styles.textLableInputAndroid}>Horário da coleta</Text>
                                ) : (
                                    <Text style={styles.textLableInputIOS}>Horário da coleta</Text>
                                )}
                                {/* O datePicker funciona nativamente apenas no Ios
                                    para android é preciso modificações */}
                                {Platform.OS === 'android' ? (
                                    <TouchableOpacity
                                        onPress={() =>
                                            DateTimePickerAndroid.open({
                                                mode: 'time',
                                                is24Hour: true,
                                                value: Aux2Coleta,
                                                onChange: (event, date) =>
                                                    event.type === 'set' ? setAux2Coleta(date) : null,
                                            })
                                        }
                                    >
                                        <View style={styles.textDateInput}>
                                            <Text style={{ color: 'grey' }}>{Aux2Coleta.toLocaleTimeString('pt-BR', { timeZone: 'UTC' })}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <RNDateTimePicker
                                        mode="time"
                                        value={Aux2Coleta}
                                        style={styles.hourIOS}
                                        onChange={(event, date) => setAux2Coleta(date)}
                                    />
                                )}
                            </View>
                        </View>

                        <InputPedido
                            label="Endereço:"
                            value={endereco}
                            onChangeText={(text) => setEndereco(text)}
                            keyboardType="default"
                            required
                        />

                        <Picker
                            selectedValue={lixoPerigoso}
                            onValueChange={handleChangeLixoPerigoso}
                            style={styles.picker}
                            itemStyle={{ fontSize: 16, height: 50, textAlign: 'left', marginLeft: -13 }}
                        >
                            <Picker.Item label="Resíduo Perigoso" />
                            <Picker.Item label="Não" value={false} />
                            <Picker.Item label="Sim" value={true}/>
                        </Picker>

                        <Picker
                            mode='dialog'
                            numberOfLines={1}
                            selectedValue={tipoLixo}
                            onValueChange={handleChangeTipoLixo}
                            style={styles.picker}
                            itemStyle={{ fontSize: 16, height: 50, textAlign: 'left', marginLeft: -13 }}
                        >
                            <Picker.Item label="Tipo de resíduo" />
                            <Picker.Item label="Eletrodoméstico" value={0} />
                            <Picker.Item label="Eletroportáteis" value={1} />
                            <Picker.Item label="Monitores" value={2} />
                            <Picker.Item label="Iluminação" value={3} />
                            <Picker.Item label="Fios e Cabos" value={4} />
                            <Picker.Item label="Pilhas e baterias" value={5} />
                            <Picker.Item label="TI e telecomunicações" value={6} />
                            <Picker.Item label="Painéis Fotovoltaicos" value={7} />
                        </Picker>

                        <InputPedido
                            label="Quantidade de resíduo:"
                            value={qtdLixo}
                            onChangeText={(text) => setQtdLixo(text)}
                            keyboardType="numeric"
                            required
                        />

                        <InputPedido
                            label="Descrição:"
                            value={descricao}
                            onChangeText={(text) => setDescricao(text)}
                            keyboardType="default"
                            required
                        />

                        <Button
                            title="Solicitar"
                            theme={{ colors: { primary: '#FFFFFF' } }}
                            onPress={() => handleSubmit()}
                        />

                        <Button
                            title="Voltar"
                            theme={{ colors: { primary: '#FFFFFF' } }}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                </Body>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    titulo: {
        fontSize: 24,
        marginBottom: 40,
        color: '#fff',
        textAlign: 'center',
    },
    picker: {
        backgroundColor: "#EDEBEB",
        marginBottom: 10,
        borderRadius: 5,
        width: '80%',
        height: 50,
        color: '#605d60',
    },
    littleCard: {
        width: "48.5%",
        height: 50,
        borderRadius: 5,
        backgroundColor: "#EDEBEB",
        paddingLeft: 10,
        marginVertical: 5,
        justifyContent: 'center',
        textAlign: 'center',
        // flexDirection: "column",
        // justifyContent: "space-evenly",
    },
    uniao: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        width: '80%',
        marginBottom: 5,
        marginTop: -6
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    textLableInputAndroid: {
        fontSize: 12,
        marginVertical: 1,
        paddingLeft: 6
    },
    textLableInputIOS: {
        fontSize: 12,
        marginTop: 3,
        //padding: 30,
        //fontWeight: '400',
        // textAlign:'center',
        // justifyContent: 'center',
        marginVertical: 1,
        paddingLeft: 6
    },
    textDateInput: {
        justifyContent: 'center',
        paddingLeft: 6,
    },
    dateIOS: {
        height: 25,
        width: 77,
        marginLeft: 6,
    },
    hourIOS: {
        height: 25,
        width: 62,
        marginLeft: 6,
        //paddingEnd: 60,
        //backgroundColorolor: "white"
    }
});

export default FormularioPedidos;