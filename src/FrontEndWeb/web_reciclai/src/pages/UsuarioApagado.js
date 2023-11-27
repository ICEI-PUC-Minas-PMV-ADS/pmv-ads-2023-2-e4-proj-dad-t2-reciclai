import styles from './styles/UsuarioApagado.module.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const UsuarioApagado = () => {

    const navigate = useNavigate();

    const handleContinuar = () => {
        navigate('/');
      };

    return(
        <div>
            <h1 className={styles.titulo} >Usuário deletado com sucesso</h1>
            
            <Button  onClick={handleContinuar} className={styles.botao3} >
              Continuar
            </Button>
        </div>
    );
};
export default UsuarioApagado;