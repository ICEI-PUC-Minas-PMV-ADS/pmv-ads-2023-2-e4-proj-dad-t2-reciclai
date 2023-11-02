import { Container } from '@mui/material';
import styles from './styles/Sobre.module.css';
import seta from "../img/seta.gif";
import lata from "../img/lata.gif";
import setadupla from "../img/setadupla.gif";
import retorno from "../img/retorno.gif";
import Natureza from "../img/Natureza.jpg";
import Image from 'react-bootstrap/Image';


function Sobre(){
    return(
        <Container className={styles.Container}>
            <h1 className={styles.titulo} >Reciclaí</h1>
            <img src={seta} alt="seta.gif" />
            <img src={lata}  />
           
            <h5>
                Um dos desafios que a tecnologia enfrenta nos últimos 20 anos é a absolência programada. Com o obetivo de fomentar o consumo e
            maximizar os lucros, os componentes eletrônicos possuem um ciclo de vida definido e pouco é feito pelas indústrias e fabricantes 
            para diminuir o problema do lixo gerado. Muitos dos materiais eletrônicos e periféricos podem ser reciclados, sendo o descarte apropriado e a coleta, o principal entrave
            para a reutilização desses componentes. Nosso projeto, o Reciclaí, entra nesse contexto como uma alternativa sustentável. Visando conectar 
            catadores, empresas e consumidores para destinar corretamente o lixo eletrônico, diminuindo o impacto ambiental.
            </h5>
            
            <div className={styles.grid}>
                <div className={styles.gridItem}>
                    <p className={styles.p}>askdajsdka</p>
                </div>
                <div className={styles.gridItem}>
                    <p className={styles.p}>Fomenta um mercado de comercialização justo</p>
                </div>
                <div className={styles.gridItem}>
                    <p className={styles.p}>Estimula a autoestima e o sentimendo de pertencimento</p>
                </div>
                <div className={styles.gridItem}>                            
                    <p className={styles.p}>Traz dignidade e respeito aos trabalhadores</p>
                </div>
                <div className={styles.gridItem}>
                    <p className={styles.p}>Reconhece a importância de organizações para catadores</p>
                </div>
                <div className={styles.gridItem}>
                    <p className={styles.p}>Inclui e integra catadores de materiais recicláveis</p>
                </div>
            </div>
        </Container>
    )
}
export default Sobre;