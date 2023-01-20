import React from 'react'
import { Container } from 'react-bootstrap';
import MultiStepProgressBar from '../components/MultiStepProgressBar'
import "../RegisterProvider.css";

function RegisterProviderScreen() {
  return (
    <Container>
      <MultiStepProgressBar/>
    </Container>
  )
}

export default RegisterProviderScreen;