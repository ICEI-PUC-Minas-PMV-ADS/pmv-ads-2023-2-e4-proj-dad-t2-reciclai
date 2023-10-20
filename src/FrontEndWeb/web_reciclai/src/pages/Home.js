import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Natureza from "../img/Natureza.jpg";
import Eletronico from "../img/Eletronico.jpg";
import People from "../img/people.png";
import Depoimentos from '../components/Depoimentos'

function Home() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <><Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src={Natureza}
          alt="Firt slide"
          width={300}
          height={500} />

        <Carousel.Caption
          className="d-block w-100 h-50"
        >
          <h5></h5>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={People}
          alt="Second slide"
          width={300}
          height={500} />

        <Carousel.Caption
          className="d-block" color="fff">
          <h5> </h5>
          <p> </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Eletronico}
          alt="Third slide"
          width={300}
          height={500} />

        <Carousel.Caption
          className="d-block w-100 h-50">
          <h5></h5>
          <p>

          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      <Depoimentos></Depoimentos></>
  );
}
export default Home;

