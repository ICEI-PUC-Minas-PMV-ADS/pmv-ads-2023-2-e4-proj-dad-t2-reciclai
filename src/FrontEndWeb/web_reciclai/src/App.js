import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar.js";

import Home from "./pages/Home/Home.js";
import CadastroUsuario from './pages/CadastroUsuario/index.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="usuarios" element={<CadastroUsuario />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
