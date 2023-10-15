import Figure from 'react-bootstrap/Figure';
import Angelica from "../img/Angélica.jpg";
import Jorge from "../img/Jorge.jpg";

function FigureHome() {
  return (
    <Figure>
      <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src={Angelica}
      />
      <Figure.Caption>
        Angélica: "Excelente App de Reciclagem ".
      </Figure.Caption>

      <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src={Jorge}
      />
      <Figure.Caption>
        Jorge: "Utilizo o aplicativo para coletar reciclagem e estou achando excente".
      </Figure.Caption>
    </Figure>
    
  );
}

export default FigureHome;