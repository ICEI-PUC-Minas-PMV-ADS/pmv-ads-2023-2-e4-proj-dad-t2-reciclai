import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function Depoimentos() {
  return (
    <Container>
    <Row xs={2} md={3} className="g-3">
      {Array.from({ length: 3 }).map((_, idx) => (
        <Col key={idx}>
          <Card body outline color="success" className="mx-auto my-5">
            <Card.Body>
              <Card.Title>Ana</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
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
