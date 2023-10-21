import Button from 'react-bootstrap/Button';
import { Container, InputLabel } from '@mui/material';
import Botao from '../components/Button.js';
import styles from './CadastroUsuario.module.css';
import React, { useState, useEffect } from 'react';
import Input from '../components/Input.js';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


const PerfilUsuario = () => {
  async function handleSubmit(event) {
    event.preventDefault();
    

  }
  


  return (
    <React.Fragment>
    <Container>
      <h2 className={styles.form}>Perfil de Usuário</h2>
      <form onSubmit={(event) => handleSubmit(event)} action={<Link to="/" />}>

      
      <div >
        <Input
            disabled
            id="nomeUsuario"
            label="Nome Usuário" 
          />
        </div>
      <div >
        <Input
            disabled
            id="emailUsuario"
            label="Email" 
          />
      </div>
      <div >
        <Input
            disabled
            id="enderecoUsuario"
            label="Endereço" 
          />
      </div>

      <div >
        <Input
            disabled
            id="perfilUsuario"
            label="Perfil" 
          />
      </div>

      <div >
        <Input
            disabled
            id="tipoLixo"
            label="Tipo de Lixo" 
          />
      </div>
      
      <div> . </div>
      
      <div >
      <Botao type="submit" className={styles.botao} >
          Editar        
        </Botao>
        </div>
        <div> . </div>
      <div >
      <Botao className={styles.botao} >
          Excluir        
        </Botao>
      </div>
      </form>
    </Container>
    </React.Fragment>
  );
};

export default PerfilUsuario;