import logo from "../assets/marketplace_logo.png";
//import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setUserValidator } from "../redux/features/userSlice";

function Navbar() {
  const dispatch = useDispatch()
  const userValidation = useSelector((state: RootState) => state.user.userValidation)

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
          <Link to='/products'><li>Market</li></Link>
        </li>
        <li>Nosotros</li>
        <Link to="/vender">
          <button className="nav__button-sell">Vender</button>
        </Link>
      </ul>

      <SearchBar/>
      <div className="nav__user"><Link to="/login">
        {userValidation === false ? <button className="nav__button-login">Iniciar Sesión</button>
         : <button className="nav__button-login" onClick={() => dispatch(setUserValidator(false))}>Cerrar Sesión</button>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;