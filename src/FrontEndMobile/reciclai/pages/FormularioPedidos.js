import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '../contexts/UserContext';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import Container from '../components/Container';
import Body from '../components/Body';
import InputPedido from '../components/inputPedido';
import Logo from '../components/Logo';

import { insertPedidos, insertUsuariosPedidos } from '../services/Pedidos.services';
import Button from '../components/ButtonFormulario';

const FormularioPedidos = ({route}) => {
    const { id } = route.params.data;
    const coletor = id;
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
    const [quantidadeLixo, setQuantidadeLixo] = useState();

    const handleChangeTipoLixo = (value) => {
        setTipoLixo(value);
    }

    function formattedDate(date){
        let myDate; 
        myDate = new Date(date)
            myDate.setMinutes(myDate.getMinutes() + myDate.getTimezoneOffset())

            return myDate;
    }

    function formattedDateTime(date1, date2){
        let data;
        data = formattedDate(date1)
            data.setHours(date2.getHours())
            data.setMinutes(date2.getMinutes())
            data.setSeconds(date2.getSeconds())
            if(Platform.OS !== 'android'){
                data.setHours(data.getHours() - (data.getTimezoneOffset()/60))
            }
            // console.log(data.getHours())
            // console.log(data.getTimezoneOffset())
        return data;
    }

    const handleChangeLixoPerigoso = (value) => {
        setLixoPerigoso(value);
    }

    async function handleSubmit() {

        const novoPedido = await insertPedidos({
            "idSolicitante": solicitante,
            "idColetor": coletor,
            "nomeSolicitante": nomeSolicitante,
            "dataColeta": formattedDateTime(Aux1Coleta, Aux2Coleta),
            "endereco": endereco,
            "lixoPerigoso": lixoPerigoso,
            "descricao": descricao,
            "tipoLixo": parseInt(tipoLixo),
            "qtdLixo": parseInt(quantidadeLixo),
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

        // navigation.navigate('/buscaColetor');
    }


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
                            onChangeText={(text) => setNomeSolicitante(text)}
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
                                        style={styles.dateIOS}
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
                            <Picker.Item label="Lixo Perigoso" />
                            <Picker.Item label="Não" value={false} />
                            <Picker.Item label="Sim" value={true} />
                        </Picker>

                        <Picker
                            mode='dialog'
                            numberOfLines={1}
                            selectedValue={tipoLixo}
                            onValueChange={handleChangeTipoLixo}
                            style={styles.picker}
                            itemStyle={{ fontSize: 16, height: 50, textAlign: 'left', marginLeft: -13 }}
                        >
                            <Picker.Item label="Tipo de lixo" />
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
                            label="Quantidade de lixo:"
                            value={quantidadeLixo}
                            onChangeText={(text) => setQuantidadeLixo(text)}
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

                    </View>
                </Body>
            </ScrollView>

        </Container >
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
        width: "48%",
        height: 50,
        borderRadius: 5,
        backgroundColor: "#EDEBEB",
        padding: 10,
        marginVertical: 5,
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    uniao: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        width: '80%',
        marginBottom: 5
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    textLableInputAndroid: {
        fontSize: 13,
        marginVertical: 1,
        paddingLeft: 6
    },
    textLableInputIOS: {
        fontSize: 13,
        //marginTop: 10,
        //padding: 30,
        //fontWeight: '400',
        // textAlign:'center',
        // justifyContent: 'center',
        marginVertical: 1,
        paddingLeft: 6
    },
    textDateInput: {
        justifyContent: 'center',
        paddingLeft: 5,
    },
    dateIOS: {
        //height: 30,
        //marginLeft:6,
        paddingEnd:60,
    }
});

export default FormularioPedidos;