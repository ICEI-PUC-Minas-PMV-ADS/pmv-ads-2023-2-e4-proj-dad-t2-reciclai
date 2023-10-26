import React, { useState } from 'react';
import { Container } from '@mui/material';
import styles from './styles/Login.module.css';
import Input from '../components/Input.js';
import Botao from '../components/Button.js';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { login } from '../services/Auth.services';


const Login = () => {
    const navigate = useNavigate();
    const { setSigned, setUser } = useUser();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        login({
          email: email,
          senha: senha,
        }).then((res) => {
          console.log(res);
    
          if (res && res.jwtToken) {
            setSigned(true);
            setUser(res.jwtToken);
            console.log(res.jwtToken)
            localStorage.setItem('jwtToken', res.jwtToken);
            localStorage.setItem('userId', res.userId);
            navigate('/aposlogin')
          } else {
            alert('Atenção, Usuário ou senha inválidos!');
          }
        });
      };

    return (
        <Container>
            <h2 className={styles.title}>Login</h2>
            <div  className={styles.container}>
                <div className={styles.box} >
                    <Input
                        type="text"
                        label="Usuário:"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <Input
                        type="password"
                        label="Senha:"
                        onChange={e => setSenha(e.target.value)}
                        value={senha}
                    />

                    <div className={styles.texto}>
                        <Botao  onClick={handleLogin} className={styles.botao}>Login</Botao>
                        <p >Não tem uma conta?<a href="/cadastro">Cadastre-se</a> </p>
                        <p> Esqueci a senha</p>
                    </div>
                </div>
            </div>

        </Container>
    );

};
export default Login;