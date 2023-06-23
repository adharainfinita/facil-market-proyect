import logo from "../assets/marketplace_logo.png";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setUserValidator } from "../redux/features/userSlice";
import { useState } from "react";

function Navbar() {
  const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user.userLogin.user)
	const userValidation = useSelector((state: RootState) => state.user.userValidation)
  const [openUser, setOpenUser] = useState<boolean>(false)

  const firstName =  user.fullName.split(' ')[0]

  const handleOpen = () => {setOpenUser(!openUser)}
  const handleLogOut = () => {
    dispatch(setUserValidator(false))
    setOpenUser(false)
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
      </ul>

      <div className="nav__user">

          <SearchBar />

          <Link to="/vender">
              <button className="nav__button-sell">Vender</button>
          </Link>
        
          {userValidation === false ?
           <Link to="/login">
            <button className="nav__button-login">Iniciar Sesión</button> 
          </Link>
          :(
            <div className="profile-img">
              <img src={user.image} alt="user" className="nav__userLogo" onClick={handleOpen} />
              <h5 className="nav___userName">{firstName}</h5>

              {openUser && 
              <div className="nav__user-dropdown">
                <Link to='/profile'><button className="nav__dropdown-user-option">Mi perfil</button></Link> 
                <Link to='/products'><button className="nav__dropdown-user-option">Mis productos</button></Link> 
                <hr />
                <button onClick={handleLogOut} className="nav__dropdown-user-option">Cerrar Sesión</button>
              </div>
              }
            </div>
           )}


          
        
      </div>
    </nav>
  );
}

export default Navbar;
