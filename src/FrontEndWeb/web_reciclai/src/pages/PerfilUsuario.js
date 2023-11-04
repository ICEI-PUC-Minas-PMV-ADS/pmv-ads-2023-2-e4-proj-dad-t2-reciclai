import React, { useState, useEffect } from 'react';
import styles from './styles/PerfilUsuario.module.css';
import Button from 'react-bootstrap/Button';
import { Container, Stack } from '@mui/material';
import {Link, useNavigate } from 'react-router-dom';
import { getUsuario } from '../services/Usuarios.services.js';
import { useUser } from '../contexts/UserContext';
import {deleteUsuario} from '../services/Usuarios.services';

const PerfilUsuario = () => {
  const {userId, setSigned} = useUser();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [perfil, setPerfil] = useState('');
  const [tipoLixo, setTipoLixo] = useState('');
  const navigate = useNavigate();
  const [estado, setEstado] = useState('');

  const Perfil =
    [
        'Solicitante',
        'Coletor'
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

  useEffect(() => {
    fetchUsuario();
  }, []);


  async function fetchUsuario() {
    try {
      const res = await getUsuario(userId);
      setNome(res.nome);
      setEmail(res.email);
      setEndereco(res.endereco);
      setPerfil(Perfil[res.perfil]);
      setTipoLixo(TipoLixo[res.tipoLixo]);
      setEstado(res.estado);
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  }

  const handleEditar = () => {
    navigate(`/cadastro/${userId}`);
  };

  async function handleExcluir(event) {
    event.preventDefault();
    await deleteUsuario(userId);  
    setSigned(false);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    navigate('/usuarioApagado');
  };
  
  return (
    <Container>
     
       
          <h4 className={styles.titulo}>Perfil do Usuário</h4>
          <p>Nome: {nome}</p>
          <p>Email: {email}</p>
          <p>Endereço: {endereco}</p>
          <p>Estado: {estado}</p>
          <p>Perfil: {perfil}</p>
          <p>Tipo de Lixo: {tipoLixo}</p>
          
            <Button  onClick={handleEditar} className={styles.botao3} >
              Editar
            </Button>
            <Button variant="outline-danger" onClick={handleExcluir}className={styles.botao4}>
              Excluir
            </Button>
    
      
  
    </Container>
  );
};

export default PerfilUsuario;