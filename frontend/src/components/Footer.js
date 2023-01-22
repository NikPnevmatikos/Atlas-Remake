import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <Container className='footer'>
      <Row>
        <Col className="text-center py-3">
          Copyright &copy; Atlas
        </Col>
      </Row>
    </Container>
  )
}

export default Footer