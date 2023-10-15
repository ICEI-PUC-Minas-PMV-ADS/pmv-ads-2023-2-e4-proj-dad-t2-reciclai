import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Reciclando from "../img/Reciclando.jpg"
import Reciclando1 from "../img/Reciclando1.jpg"
import Reciclando2 from "../img/Reciclando2.jpg"


function Home() {
   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };

   return (
      <Carousel data-bs-theme="dark">
      <Carousel.Item >
        <img 
          className="d-block w-30" 
          src={Reciclando}
          alt="Firt slide"
          height={300}
          />
         
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-30"
          src={Reciclando1}
          alt="Second slide"
          height={300}
          />
      
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-30"
          src={Reciclando2}
          alt="Third slide"
          height={300}
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
   );
}
export default Home;