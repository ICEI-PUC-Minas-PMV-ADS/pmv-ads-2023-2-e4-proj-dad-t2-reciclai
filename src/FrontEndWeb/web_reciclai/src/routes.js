import CadastroUsuario from './pages/CadastroUsuario.js'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<CadastroUsuario />}></Route> 
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;