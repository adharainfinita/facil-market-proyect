import logo from "../assets/marketplace_logo.png";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";
import { AuthProvider } from "../context/AuthContext";
function Navbar() {
  const auth = useAuth();
  const {displayName, photoURL} = auth.user

  const handleLogout = () => {
		auth.logout();
	}

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
          <li>Market</li>
        </Link>

        <li>Nosotros</li>
        <Link to="/vender">
          <button className="nav__button-sell">Vender</button>
        </Link>
      </ul>

      <SearchBar />
      <div className="nav__user">
        <div>
          <img src={photoURL} alt="user" className="nav__userLogo" />
          {displayName && <h5 className="nav___userName">{displayName}</h5>}
        </div>
        <Link to="/login">
          { displayName ? (
            <button
              className="nav__button-login"
              onClick={() => handleLogout()}
            >
              Cerrar Sesión
            </button>
          ): (
            <button className="nav__button-login" >Iniciar Sesión</button>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;