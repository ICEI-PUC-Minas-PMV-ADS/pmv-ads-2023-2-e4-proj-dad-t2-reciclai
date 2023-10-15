import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Header from "./components/Header.js";

import Home from "./pages/Home.js";
import CadastroUsuario from "./pages/CadastroUsuario.js";
import PerfilUsuario from "./pages/PerfilUsuario.js";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PerfilUsuario/>} />
          <Route path="/cadastro" element={<CadastroUsuario />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
