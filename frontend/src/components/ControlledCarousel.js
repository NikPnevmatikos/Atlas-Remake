import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { ArrowRight } from 'react-bootstrap-icons';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Carousel.Caption>
        <h1>Είσαι Φοιτητής ή Φοιτήτρια;</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem <br/>
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown <br/>
          printer took a galley of type and scrambled it to make a type specimen book.</p>
        <button type="button" class="btn btn-info">Ξεκίνα τώρα!    <ArrowRight size={17} /></button> 
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;