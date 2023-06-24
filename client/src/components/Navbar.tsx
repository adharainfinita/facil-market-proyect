import logo from "../assets/marketplace_logo.png";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const { userLogin } = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();
	const session = window.localStorage.getItem("token");

	const handleLogOut = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		window.localStorage.removeItem("token");
		navigate("/");
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
					<li>Market</li>
				</Link>

				<li>Nosotros</li>
				<Link to="/vender">
					<button className="nav__button-sell">Vender</button>
				</Link>
			</ul>

			<SearchBar />

			<div className="nav__user">
				{session && (
					<div>
						<Link to="/profile">
							<img
								src={userLogin.user.image}
								alt="user"
								className="nav__userLogo"
							/>
							)
						</Link>
						<h5 className="nav___userName">{userLogin.user.fullName}</h5>
					</div>
				)}

				<Link to="/login">
					{!session ? (
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
