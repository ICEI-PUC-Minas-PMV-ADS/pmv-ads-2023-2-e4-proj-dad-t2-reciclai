import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel' ;
import Natureza from "../img/Natureza.jpg";
import Eletronico from "../img/Eletronico.jpg";
import People from "../img/people.png";
import FigureHome from '../components/FigureHome'



function Home() {
   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };

   return (
      <Carousel data-bs-theme="dark">
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
           className="d-block w-50"
           src={People}
           alt="Second slide"
           width={300}
           height={500} 
           />

         <Carousel.Caption
         className="d-block w-100 h-50">
           <h5>Cadastre-se </h5>
           <p>Venha Fazer Parte Dessa Transformação!! </p>
         </Carousel.Caption>
       </Carousel.Item>
       <Carousel.Item>
         <img
           className="d-block w-50"
           src={Eletronico}
           alt="Third slide"
           width={300}
           height={500} />

         <Carousel.Caption
         className="d-block w-100 h-50">
           <h5>Não Sabe Como Descartar Seu Lixo Eletrônico?</h5>
           <p>
             Baixe Nosso Aplicativo!
           </p>
         </Carousel.Caption>
       </Carousel.Item>
     </Carousel>
    
   );
   
  
}
export default Home;