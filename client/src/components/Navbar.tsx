import logo from "../assets/marketplace_logo.png";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <Link to="/">
        <div className="nav__logo">
          <img width={70} src={logo} alt="marketplace logo" />
          <h1>Facil Market</h1>
        </div>
      </Link>

      <ul className="nav__items">
        <Link to="/">
          <li>Inicio</li>
        </Link>
        <li>
          Categorías <BsChevronDown />
        </li>
        <li>Nosotros</li>
        <Link to="/vender">
          <button className="nav__button-sell">Vender</button>
        </Link>
      </ul>

      <div className="nav__user"><Link to="/login">
        <button className="nav__button-login">Iniciar Sesión</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;