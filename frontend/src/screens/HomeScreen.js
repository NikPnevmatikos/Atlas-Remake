import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { LinkContainer } from 'react-router-bootstrap'
// import ControlledCarousel from "../components/ControlledCarousel.js"
// import headerImg from "../assets/img/header-img.svg";
import { ArrowRight } from 'react-bootstrap-icons';
// import 'animate.css';
// import TrackVisibility from 'react-on-screen';
// import {student} from "./student.png";

import videobg from '../videobg_Trim.mp4'

function HomeScreen() {

  return (
    <div className='main'>
      <div className="overlay"></div>
      <video src={videobg} autoPlay loop muted/>
      
      <div className="content">
        <Carousel>
          <Carousel.Item className='carousel-items'>
            <img
              src="https://imageio.forbes.com/blogs-images/cognitiveworld/files/2019/06/types-of-AI.jpg?format=jpg&width=960"
              style={{ width: "1500px", height: "300px"}}
              alt="First slide"
            />
            <Carousel.Caption className="text-center justify-content-sm-center">
              {/* <div className="text-center"> */}
                <h3>Είσαι Φοιτητής ή Φοιτήτρια;</h3>
                <p>Θέλεις να κάνεις Πρακτική Άσκηση;  Οι υπηρεσίες του Άτλα διαθέτουν τις πρακτικές <br/>
                ασκήσεις που επιθυμείς και διευκολύνουν την αναζήτηση και την απόκτηση τους!</p>
                <LinkContainer to='/students'>
                  <Button  class="btn btn-info">Ξεκίνα τώρα!    <ArrowRight size={17} /></Button> 
                </LinkContainer>
              {/* </div> */}
            
            
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item className='carousel-items'>
          <img
            src="https://imageio.forbes.com/blogs-images/cognitiveworld/files/2019/06/types-of-AI.jpg?format=jpg&width=960"
            style={{ width:'1500px' , height: "300px"}}
            alt="First slide"
          />
            <Carousel.Caption>
            {/* <div className="text-center form-inline text-break" style={{width: 'auto'}} sm='100px'> */}
              <h3>Ψάχνεις πρακτικάριους για την επιχείρηση σου;</h3>
              <p className="text-break">Οι υπηρεσίες του Άτλα κάνουν την δημοσίευση των θέσεων πρακτικής άσκησης <br/>
                και την εύρεση πρακτικάριου εύκολη και γρήγορη!</p>
              <LinkContainer to='/internship_provider'>
                <Button class="btn btn-info">Ξεκίνα τώρα!    <ArrowRight size={17} /></Button> 
              </LinkContainer>
            {/* </div> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>        
      </div>
    </div>
  )
}

export default HomeScreen