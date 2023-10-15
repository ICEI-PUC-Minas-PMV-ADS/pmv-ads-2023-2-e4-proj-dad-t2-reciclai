import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Home from "./pages/Home.js";
import CadastroUsuario from './pages/CadastroUsuario.js';
import Header from './components/Header.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="usuarios" element={<CadastroUsuario />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
