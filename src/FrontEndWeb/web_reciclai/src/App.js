import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Header from "./components/Header.js";

import Home from "./pages/Home/Home.js";
import CadastroUsuario from './pages/CadastroUsuario/index.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
