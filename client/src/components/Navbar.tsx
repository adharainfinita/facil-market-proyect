import logo from "../assets/marketplace_logo.png";
// import { RxPerson } from "react-icons/rx";
import { BsChevronDown } from "react-icons/bs";

function Navbar() {
  return (
    <nav className="nav">
      <div className="nav__logo">
        <img width={70} src={logo} alt="marketplace logo" />
        <h1>Facil Market</h1>
      </div>

      <ul className="nav__items">
        <li>Inicio</li>
        <li>
          Categorías <BsChevronDown />
        </li>
        <li>Nosotros</li>
        <button className="nav__button-sell">Vender</button>
      </ul>

      <div className="nav__user">
        <button className="nav__button-login">Iniciar Sesión</button>
      </div>
    </nav>
  );
}

export default Navbar;
