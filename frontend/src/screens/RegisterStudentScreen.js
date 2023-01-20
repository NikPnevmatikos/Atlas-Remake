import React from 'react'
import { Container } from 'react-bootstrap';
import MultiStepProgressBar from '../components/MultiStepProgressBar'
import "../RegisterProvider.css";

function RegisterStudentScreen() {
  return (
    <Container>
      <MultiStepProgressBar type={1}/>
    </Container>
  )
}

export default RegisterStudentScreen