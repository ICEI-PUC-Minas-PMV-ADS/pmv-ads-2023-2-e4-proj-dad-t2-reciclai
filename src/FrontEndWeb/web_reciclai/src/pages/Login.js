import styles from './styles/Login.module.css';
import Input from '../components/Input.js';
import Botao from '../components/Button.js';

const Login = () => {


    return (
        <container>
            <h2 className={styles.title}>Login</h2>
            <div class ="container" className={styles.container}>
                <div class="box"className={styles.box} >
            <Input
                type="text"
                label="Usuário:"
            />
             <Input
                type="password"
                label="Senha:"
            />
            
           <div className={styles.texto}>
            <Botao type="submit" className={styles.botao}>Login</Botao>
            <p >Não tem uma conta?<a href= "./cadastro">Cadastre-se</a> </p>
            <p> Esqueci a senha</p>
            </div>
            </div>
      </div>
         
        </container>
    );

};
export default Login;