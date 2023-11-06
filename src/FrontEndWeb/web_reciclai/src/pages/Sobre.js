import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './styles/Sobre.module.css';
import reciclagem from '../img/reciclagem.png';
import perfil from '../img/perfil.png';
import coletor from '../img/coletor.png';
import card1 from '../img/card1.png';

function Sobre() {
    return (
        <Container>
            <Row>
                <Col>
                    <h2 className={styles.titulo}>Saiba mais sobre o projeto Reciclaí</h2>
                </Col>
            </Row>
            <div className={styles.div1}>
                <Row>
                    <Col>
                        <p className={styles.p1}>
                            Um dos desafios que a tecnologia enfrenta nos últimos 20 anos é a absolência programada. Com o obetivo de fomentar o consumo e
                            maximizar os lucros, os componentes eletrônicos possuem um ciclo de vida definido e pouco é feito pelas indústrias e fabricantes
                            para diminuir o problema do lixo gerado. Muitos dos materiais eletrônicos e periféricos podem ser reciclados, sendo o descarte apropriado e a coleta, o principal entrave
                            para a reutilização desses componentes. Nosso projeto, o Reciclaí, entra nesse contexto como uma alternativa sustentável. Visando conectar
                            catadores, empresas e consumidores para destinar corretamente o lixo eletrônico, diminuindo o impacto ambiental.
                        </p>
                    </Col>
                    <Col>
                        <img src={reciclagem} alt='reciclagem' className={styles.imagem1} />
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col>
                        <h2 className={styles.funciona}>Como funciona:</h2>
                    </Col>
                </Row>
                <div className={styles.cards}>
                <Row >
                    <Col>
                        <Card style={{ width: '18rem', height: '320px' }}>
                            <Card.Img variant="top" src={card1} />
                            <Card.Body>
                                <Card.Title>Primeiro passo</Card.Title>
                                <Card.Text>
                                    Faça seu cadastro no site.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                   
                        </Col>
                        <Col>
                    <Card style={{ width: '18rem', height: '320px'  }}>
                        <Card.Img variant="top" src={perfil}/>
                        <Card.Body>
                            <Card.Title>Segundo passo:</Card.Title>
                            <Card.Text>
                                Realize o login e entre na sua conta. 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                 
                    <Card style={{ width: '18rem', height: '320px'  }}>
                        <Card.Img variant="top" src={coletor} />
                        <Card.Body>
                            <Card.Title>Terceiro passo: </Card.Title>
                            <Card.Text>
                                Clique na lupa no cabeçalho e procure um Coletor perto de você.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                

                </Row>
                </div>
            </div>

        </Container>
    )
}
export default Sobre;