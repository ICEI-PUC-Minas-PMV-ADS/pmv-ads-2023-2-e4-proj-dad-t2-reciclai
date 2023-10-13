import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import CadastroUsuario from './pages/CadastroUsuario/index.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CadastroUsuario />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
