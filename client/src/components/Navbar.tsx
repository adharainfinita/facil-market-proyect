import logo from "../assets/marketplace_logo.png";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import User from "./User";
import {AiOutlineShoppingCart} from 'react-icons/ai'

function Navbar() {
  const navigate = useNavigate();
  const session = window.localStorage.getItem("token");

  const handleLogOut = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("items");
    navigate("/");
  };

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/login");
  };

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

        <Link to="/products">
          <li>Productos</li>
        </Link>

        <li>Nosotros</li>
      </ul>

      <div className="nav__user">
        <SearchBar />

        <Link to="/vender">
          <button className="nav__button-sell">Vender</button>
        </Link>


        <Link to="/cart">
          <AiOutlineShoppingCart className="nav__icon" />
        </Link>
          
        {session && <User handleLogOut={handleLogOut} />}

        {!session && (
          <button className="nav__button-login" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
