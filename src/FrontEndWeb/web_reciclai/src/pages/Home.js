import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel' ;
import Natureza from "../img/Natureza.jpg";
import Reciclando1 from "../img/Reciclando1.jpg";
import Reciclando2 from "../img/Reciclando2.jpg";
import FigureHome from '../components/FigureHome'



function Home() {
   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };

   return (
      <><Carousel data-bs-theme="dark">
       <Carousel.Item>
         <img
           className="d-block w-50 "
           src={Natureza}
           alt="Firt slide"
           width={300}
           height={500}
           />

         <Carousel.Caption  
         className="d-block w-100 h-50"
         >
           <h5>Vamos Fazer Nossa Parte?</h5>
           <p>Reciclagem é Responsabilidade de Todos!!! .</p>
         </Carousel.Caption>
       </Carousel.Item>
       <Carousel.Item>
         <img
           className="d-block w-100"
           src={Reciclando1}
           alt="Second slide"
           width={300}
           height={500} 
           />

         <Carousel.Caption>
           <h5>Second slide label</h5>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
         </Carousel.Caption>
       </Carousel.Item>
       <Carousel.Item>
         <img
           className="d-block w-100"
           src={Reciclando2}
           alt="Third slide"
           width={300}
           height={500} />
         <Carousel.Caption>
           <h5>Third slide label</h5>
           <p>
             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
           </p>
         </Carousel.Caption>
       </Carousel.Item>
     </Carousel>
     <FigureHome></FigureHome></>
   );
   
   
}
export default Home;