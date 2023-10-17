import React, {useState, useEffect} from 'react';
import { Container, Stack } from '@mui/material';
import { Link } from "react-router-dom";
import styles from './CadastroUsuario.module.css';
import Input from '../components/Input.js';
import Botao from '../components/Button.js';
//import { insertUsuarios } from '../services/Usuarios.services';
import { SelectPerfil } from '../components/SelectPerfil.js';
import { SelectTipoLixo } from '../components/SelectTipoLixo.js';

 

const CadastroUsuario =  () => {
  

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  //const [perfil, setPerfil] = useState('');
  //const [tipoLixo, setTipoLixo] = useState('');


  /*useEffect(() =>{
    if(item){
      setNome(item.nome);
      setEmail(item.email);
      setSenha(item.senha);
      setEndereco(item.endereco);
      setPerfil(item.perfil);
      setTipoLixo(item.tipoLixo);
     
    }
  }, [item]);*/

  function handleSubmit() {
    console.log(nome, email, senha, endereco)
  }


  return (
    <React.Fragment>
      <Container>
    <h2 className={styles.form}>Cadastro de Usuário</h2>
    <form onSubmit={handleSubmit} action={<Link to="/" />}>
        
            <Input
                type="text"
                label="Nome:"
                onChange={e => setNome(e.target.value)}
                value={nome}
                required
                sx={{mb: 4}}
            />
            <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
            <Input
                type="email"
                label="Email:"
                onChange={e => setEmail(e.target.value)}
                value={email}
                required
            />
             <Input
            type="password"
            label="Senha"
            onChange={e => setSenha(e.target.value)}
            value={senha}
            required
            sx={{mb: 4}}
        />
        </Stack>
             
          <Input
            type="text"
            label="Endereço"
            onChange={e => setEndereco(e.target.value)}
            value={endereco}
            required
            sx={{mb: 4}}
        />
        <div className={styles.select} >
        <SelectPerfil />
        </div>
        <div className={styles.select}>
        <SelectTipoLixo />
        </div>
        <Botao type="submit" onPress={handleSubmit} className={styles.botao}>
          Cadastrar
        </Botao>
    </form>
    </Container>
</React.Fragment>
  );
};

export default CadastroUsuario;