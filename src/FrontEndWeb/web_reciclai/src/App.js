import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./pages/Home.js";
import CadastroUsuario from './pages/CadastroUsuario.js';
import EditarCadastroUsuario from './pages/EditarCadastroUsuario.js';
import PerfilUsuario from  './pages/PerfilUsuario.js';
import Sobre from  './pages/Sobre.js';
import Login from  './pages/Login.js';
import Header from './components/Header.js';
import FormularioPedidos from "./pages/FormularioPedidos";
import HomeAposLogin from "./pages/HomeAposLogin";
import BuscaColetor from "./pages/BuscaColetor";
import UserProvider from "./contexts/UserContext";
import UsuarioApagado from "./pages/UsuarioApagado";

function App() {
  return (
    <div className="App">
       <UserProvider>
      <BrowserRouter> 
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/cadastro/:id" element={<EditarCadastroUsuario />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/login" element={<Login />} />
          <Route path="/formulario" element={<FormularioPedidos />} />
          <Route path="/aposlogin" element={<HomeAposLogin />} />
          <Route path="/buscaColetor" element={<BuscaColetor />} />
          <Route path="/usuarioApagado" element={<UsuarioApagado />} />
        </Routes>    
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
