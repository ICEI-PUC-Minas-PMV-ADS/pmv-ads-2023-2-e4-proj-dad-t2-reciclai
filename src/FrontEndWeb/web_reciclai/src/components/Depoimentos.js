import React, { useState, useEffect } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { getOpiniaoUsuarios } from '../services/OpiniaoUsuario.services'; 

function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState([]);
  
  useEffect(() => {
    async function fetchDepoimentos() {
      const data = await getOpiniaoUsuarios();
      if (data) {
        setDepoimentos(data);
      }
    }
    fetchDepoimentos();
  }, []);

  return (
    <Container>
      <h8>Depoimentos: </h8>
      <Row xs={1} md={3} className="g-3">
        {depoimentos.map((depoimento, idx) => (
          <Col key={idx}>
            <Card body outline color="success" className="mx-auto my-5">
              <Card.Body>
                <Card.Title>{depoimento.nome}</Card.Title>
                <Card.Text>{depoimento.mensagem}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Depoimentos;