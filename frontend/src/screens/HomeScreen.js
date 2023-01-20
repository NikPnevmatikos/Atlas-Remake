import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
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
          <Carousel.Item>
            <img
              src="https://imageio.forbes.com/blogs-images/cognitiveworld/files/2019/06/types-of-AI.jpg?format=jpg&width=960"
              style={{ width: "1470px", height: "300px"}}
              alt="First slide"
            />
            <Carousel.Caption>
            <h3>Είσαι Φοιτητής ή Φοιτήτρια;</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem <br/>
              printer took a galley of type and scrambled it to make a type specimen book.</p>
            <button type="button" class="btn btn-info">Ξεκίνα τώρα!    <ArrowRight size={17} /></button> 
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
          <img
            src="https://imageio.forbes.com/blogs-images/cognitiveworld/files/2019/06/types-of-AI.jpg?format=jpg&width=960"
            style={{ width: "1470px", height: "300px"}}
            alt="First slide"
          />
            <Carousel.Caption>
              <h3>Ψάχνεις πρακτικάριους για την επιχείρηση σου;</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <button type="button" class="btn btn-info">Ξεκίνα τώρα!    <ArrowRight size={17} /></button> 

            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>        
      </div>
    </div>
  )
}

export default HomeScreen