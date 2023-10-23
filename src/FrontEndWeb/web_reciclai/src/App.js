import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./pages/Home.js";
import CadastroUsuario from './pages/CadastroUsuario.js';
import PerfilUsuario from  './pages/PerfilUsuario.js';
import Sobre from  './pages/Sobre.js';
import Login from  './pages/Login.js';
import Header from './components/Header.js';
import FormularioPedidos from "./pages/FormularioPedidos";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/login" element={<Login />} />
          <Route path="/formulario" element={<FormularioPedidos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
