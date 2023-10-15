import { Link, NavLink } from "react-router-dom";

import logotipo from "./img/logotipo.png"
import "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav>
    <img src={logotipo} alt="logotipo" className="logo" />
      <NavLink
        className={({ isActive }) => (isActive ? "active" : undefined)}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : undefined)}
        to="/usuarios"
      >
        Cadastre-se
      </NavLink>
    </nav>
  );
};

export default Navbar;