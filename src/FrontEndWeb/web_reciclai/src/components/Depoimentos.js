import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function Depoimentos() {
  return (
    <Container>
      <Container className="containerHome">
      <h7 >Depoimentos:</h7>
      </Container>
      <Row xs={1} md={3} className="g-3">
        {depoimentos.map((depoimento, idx) => (
          <Col key={idx}>
            <Card body outline color="success" className="mx-auto my-5">
              <Card.Body style={{ height: '150px' }}>
                <Card.Title>{depoimento.nome}</Card.Title>
                <Card.Text style={{ whiteSpace: 'pre-line' }}>
                  {limitarCaracteres(depoimento.mensagem, 150)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default Depoimentos;
