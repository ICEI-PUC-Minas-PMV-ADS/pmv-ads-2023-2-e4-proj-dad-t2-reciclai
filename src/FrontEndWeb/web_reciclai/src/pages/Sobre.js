import { Container } from '@mui/material';
import styles from './styles/Sobre.module.css';
import Reciclando from "../img/Reciclando.jpg";

function Sobre(){
    return(
        <Container className={styles.Container}>
            <h1 className={styles.titulo} >Reciclaí</h1>
            <img src={Reciclando} alt="imagem de reciclados" />
            <p>
                Um dos desafios que a tecnologia enfrenta nos últimos 20 anos é a absolência programada. Com o obetivo de fomentar o consumo e
            maximizar os lucros, os componentes eletrônicos possuem um ciclo de vida definido e pouco é feito pelas indústrias e fabricantes 
            para diminuir o problema do lixo gerado. Muitos dos materiais eletrônicos e periféricos podem ser reciclados, sendo o descarte apropriado e a coleta, o principal entrave
            para a reutilização desses componentes. Nosso projeto, o Reciclaí, entra nesse contexto como uma alternativa sustentável. Visando conectar 
            catadores, empresas e consumidores para destinar corretamente o lixo eletrônico, diminuindo o impacto ambiental.
            </p>
           
        </Container>
    )
}
export default Sobre;