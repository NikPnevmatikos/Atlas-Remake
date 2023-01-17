import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
// import headerImg from "../assets/img/header-img.svg";
import { ArrowRight } from 'react-bootstrap-icons';
// import 'animate.css';
// import TrackVisibility from 'react-on-screen';
// import {student} from "./student.png";

function HomeScreen() {

  return (
    <section className="banner py-3" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            {/* <TrackVisibility> */}
              {/* {({ isVisible }) => */}
            {/* <div className={isVisible ? "animate__animated animate__fadeIn" : ""}> */}
            <span className="tagline">Καλωσήρθες στον Άτλα!</span>
            <h1>Είσαι Φοιτητής ή Φοιτήτρια;</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <button type="button" class="btn btn-info">Ξεκίνα τώρα!    <ArrowRight size={17} /></button>
            {/* </div> */}
            {/* </TrackVisibility> */}
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img  style={{width:"384px", height:"463px"}} src="/two-people-talking.png" ></img> 
            {/* <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility> */}
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default HomeScreen