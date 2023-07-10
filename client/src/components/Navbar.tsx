import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { BiMenu, BiSolidDashboard } from "react-icons/bi";
import SearchBar from "./SearchBar";
import User from "./User";
import { setUserValidator } from "../redux/features/userSlice";
import { modalNavBar, navBarOptions } from "../helpers/strings";
import logo from "../assets/marketplace_logo.png";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const session = window.localStorage.getItem("token");
  const { userLogin, userValidation } = useSelector(
    (state: RootState) => state.user
  );
  const userAdmin = userLogin.user.admin;
  // console.log(userValidation);

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  useEffect(() => {
    // Función para cerrar el menú si se hace clic fuera de él
    const handleClickOutsideMenu = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  const handleLogOut = () => {
    dispatch(setUserValidator(false));
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("items");
    navigate("/");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };
  const handleRegister = () => {
    navigate("/register");
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav__top-row">
          <Link to="/">
            <div className="nav__logo">
              <img width={70} src={logo} alt="marketplace logo" />
              <h1>Facil Market</h1>
            </div>
          </Link>
          <div onClick={handleMenuOpen} className="nav__menu">
            <BiMenu className="nav__menu-icon" />
          </div>

          <div className="nav__search-bar">
            <SearchBar />
          </div>

          <div className="nav__user">
            <Link to="/cart">
              <AiOutlineShoppingCart className="nav__icon" />
            </Link>

            {session && <User handleLogOut={handleLogOut} />}
          </div>
        </div>

        <div className="nav__bottom-row">
          <ul className="nav__items">
            {navBarOptions.map((item) => (
              <Link key={item.id} to={item.to}>
                <li>{item.category}</li>
              </Link>
            ))}
            {!session && (
              <>
                <li onClick={() => navigate("/login")}>Ingresá</li>
                <li onClick={() => navigate("/register")}>Creá tu cuenta</li>
              </>
            )}
          </ul>
        </div>
      </nav>
      {/* MODAL NAVBAR */}
      <div className={`background ${menuOpen ? "active" : ""}`}></div>
      <div ref={menuRef} className={`modal-navbar ${menuOpen ? "active" : ""}`}>
        {userValidation ? (
          <div className="modal-navbar__user modal-navbar-container">
            <div>
              <img
                className="modal-navbar-img"
                width={45}
                src={userLogin.user.image}
                alt="user image"
              />
            </div>

            <div className="modal-navbar__user-name">
              <span>Hola {userLogin?.user?.fullName}</span>
            </div>
          </div>
        ) : (
          <div className="modal-navbar-container">
            <div className="modal-navbar__guest-user">
              <div>
                <img
                  className="modal-navbar-img"
                  width={45}
                  src={userLogin.user.image}
                  alt="user image"
                />
              </div>
              <div className="guest-user-content">
                <span>Bienvenido</span>
                <p>
                  Ingresa a tu cuenta para poder vender, ver tus compras, y más.
                </p>
              </div>
            </div>
            <div className="modal-navbar-buttons">
              <button
                onClick={handleLogin}
                className="modal-navbar-button-login"
              >
                Ingresá
              </button>
              <button
                onClick={handleRegister}
                className="modal-navbar-button-register"
              >
                Creá tu cuenta
              </button>
            </div>
          </div>
        )}
        <ul className="modal-navbar__items">
          {modalNavBar.map((item) => (
            <div key={item.id}>
              {(!item.login || (item.login && userValidation)) && (
                <li>
                  <Link
                    className="modal-navbar__links"
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                  >
                    <div onClick={() => item.logOut && handleLogOut()}>
                      <div className="modal-navbar__links">
                        <span className="icon">{item.icon}</span>{" "}
                        {item.category}
                      </div>
                    </div>
                  </Link>
                </li>
              )}
            </div>
          ))}
          {userAdmin && (
            <li>
              <Link
                className="modal-navbar__links"
                to="/admin/summary"
                onClick={() => setMenuOpen(false)}
              >
                <span className="modal-navbar__links">
                  <BiSolidDashboard className="icon" /> Dashboard
                </span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
