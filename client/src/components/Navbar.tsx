import logo from "../assets/marketplace_logo.png";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUserValidator } from "../redux/features/userSlice";

function Navbar() {
	const dispatch = useDispatch();
	const { userLogin } = useSelector((state: RootState) => state.user);

	const handleLogOut = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		window.localStorage.setItem("isLogin", "false");
		dispatch(setUserValidator(false));
	};

	const isLogin = localStorage.getItem("isLogin");
	if (isLogin === "true") {
		dispatch(setUserValidator(true));
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
					<Link to="/profile">
						<img
							src={userLogin.user.image}
							alt="user"
							className="nav__userLogo"
						/>
					</Link>
					<h5 className="nav___userName">{userLogin.user.fullName}</h5>
				</div>
				<Link to="/login">
					{isLogin === "false" ? (
						<button className="nav__button-login">Iniciar Sesión</button>
					) : (
						<button
							className="nav__button-login"
							onClick={(event) => handleLogOut(event)}
						>
							Cerrar Sesión
						</button>
					)}
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
