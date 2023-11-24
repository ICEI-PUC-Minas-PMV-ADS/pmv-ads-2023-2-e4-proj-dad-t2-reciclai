import React, { useState, useEffect } from 'react';
import { Container, Stack, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Link, useLocation } from "react-router-dom";
import { insertPedidos, insertUsuariosPedidos } from '../services/Pedidos.services';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

import styles from './styles/FormularioPedidos.module.css';
import Input from '../components/Input.js';
import Botao from '../components/Button.js';
import { getUsuario, enviarEmailColetor } from '../services/Usuarios.services';

const FormularioPedidos = () => {
    const location = useLocation();
    const dados = location.state;
    const coletor = dados.id;
    const emailColetor = dados.email;
    console.log(coletor);
    const navigate = useNavigate();
    const {userId} = useUser();
    //const [idSolicitante, setIdSolicitante] = useState('');
    //const [idColetor, setIdColetor] = useState('');
    const [nomeSolicitante, setNomeSolicitante] = useState(''); 
    const [dataColeta, setDataColeta] = useState('');
    const [endereco, setEndereco] = useState('');
    const [lixoPerigoso, setLixoPerigoso] = useState();
    const [descricao, setDescricao] = useState();
    const [tipoLixo, setTipoLixo] = useState();
    const [status, setStatus] = useState();
    const [quantidadeLixo, setQuantidadeLixo] = useState();

    // async function postPedidos() {
    //     await insertPedidos().then(item => {
    //         if (item) {
    //             setIdSolicitante(userId);
    //             setIdColetor(item.idColetor);
    //             setNomeSolicitante(item.nomeSolicitante);
    //             setDataColeta(item.newDate(dataColeta));
    //             setEndereco(item.endereco);
    //             setLixoPerigoso(item.lixoPerigoso);
    //             setDescricao(item.descricao);
    //             setTipoLixo(item.tipoLixo);
    //             setQuantidadeLixo(item.quantidadeLixo);

    //         }
    //     })
    // }

    // useEffect(() => {
        
    //     postPedidos();
    // }, []);

    const handleChangeTipoLixo = (e) => {
        setTipoLixo(e.target.value);
    }

    const handleChangeLixoPerigoso = (e) => {
        setLixoPerigoso(e.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        const novoPedido = await insertPedidos({
            "idSolicitante": parseInt(userId),
            "idColetor": coletor,
            "nomeSolicitante": nomeSolicitante,
            "dataColeta": dataColeta,
            "endereco": endereco,
            "lixoPerigoso": lixoPerigoso,
            "descricao": descricao,
            "tipoLixo": tipoLixo,
            "qtdLixo": quantidadeLixo,
            "status": 0,
        });
        console.log(novoPedido.id);

        await insertUsuariosPedidos({
            "pedidoId": novoPedido.id,
            "usuarioId": parseInt(userId)
        });

        await insertUsuariosPedidos({
            "pedidoId": novoPedido.id,
            "usuarioId": coletor
        });
        
        await enviarEmailColetor({
            "email": emailColetor
        });

        navigate('/buscaColetor');
    }

    const handleNameChange = (e) => {
        setNomeSolicitante(e.target.value);
    }

    useEffect(() => {
        async function fetchUser(){
            const user = await getUsuario(userId);
            setNomeSolicitante(user.nome);
        }
        fetchUser();
      },[]);
        

    return (
        <React.Fragment>
            <Container>
                <h2 className={styles.form}>Formulário de solicitação</h2>
                <form onSubmit={(event) => handleSubmit(event)} action={<Link to="/" />}>

                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        <Input
                            type="text"
                            label="Nome:"
                            onChange={handleNameChange}
                            value={nomeSolicitante}
                            required
                            sx={{ mb: 4 }}
                        />
                        <Input
                            type="datetime-local"
                            label="Data da coleta:"
                            max="2099-12-12T23:59"
                            onChange={e => setDataColeta(e.target.value)}
                            value={dataColeta}
                            required
                        />
                    </Stack>
                    <Box>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <Input
                                type="text"
                                label="Endereço:"
                                onChange={e => setEndereco(e.target.value)}
                                value={endereco}
                                required
                            />
                            <FormControl variant="standard" sx={{ mb: 4 }} fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">Lixo Perigoso</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={lixoPerigoso}
                                    onChange={handleChangeLixoPerigoso}
                                    label="Lixo Perigoso"
                                >
                                    <MenuItem value={false}>Não</MenuItem>
                                    <MenuItem value={true}>Sim</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Box>

                    <div className={styles.select}>
                        <Box>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <FormControl variant="standard" sx={{ mb: 4 }} fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">Tipo de Lixo</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={tipoLixo}
                                        onChange={handleChangeTipoLixo}
                                        label="Tipo de Lixo"
                                    >
                                        <MenuItem value={0}>Eletrodoméstico</MenuItem>
                                        <MenuItem value={1}>Eletroportáteis</MenuItem>
                                        <MenuItem value={2}>Monitores</MenuItem>
                                        <MenuItem value={3}>Iluminação</MenuItem>
                                        <MenuItem value={4}>Fios e Cabos</MenuItem>
                                        <MenuItem value={5}>Pilhas e baterias</MenuItem>
                                        <MenuItem value={6}>TI e telecomunicações</MenuItem>
                                        <MenuItem value={7}>Painéis Fotovoltaicos</MenuItem>
                                    </Select>
                                </FormControl>
                                <Input
                                    type="number"
                                    label="Quantidade de lixo:"
                                    onChange={e => setQuantidadeLixo(e.target.value)}
                                    value={quantidadeLixo}
                                    required
                                    sx={{ mb: 4 }}
                                />

                            </Stack>
                        </Box>
                    </div>
                    <Input
                        type="text"
                        label="Descrição:"
                        onChange={e => setDescricao(e.target.value)}
                        value={descricao}
                        required
                        sx={{ mb: 4 }}
                    />
                    <Botao type="submit" className={styles.botao} >
                        Solicitar
                    </Botao>
                </form>
            </Container>
        </React.Fragment>
    );
};

export default FormularioPedidos;