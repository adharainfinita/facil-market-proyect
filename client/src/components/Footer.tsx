import logo from "../assets/marketplace_logo.png";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-content">
				<img width={150} src={logo} alt="marketplace logo" />
				<p>Comprar nunca fue tan fácil.</p>
				<div className="icons">
					<a href="#">
						<BsFacebook />
					</a>
					<a href="#">
						<BsTwitter />
					</a>
					<a href="#">
						<BsInstagram />
					</a>
				</div>
			</div>
			<div className="footer-content">
				<h4>General</h4>
				<li>
					<a href="/">Inicio</a>
				</li>
				<li>
					<a href="#">Nosotros</a>
				</li>
				<li>
					<Link to="/products">Productos</Link>
				</li>
			</div>

			<div className="footer-content">
				<h4>Ayuda</h4>
				<li>
					<a href="#">FAQS</a>
				</li>
				<li>
					<a href="#">Política de privacidad</a>
				</li>
				<li>
					<Link to="/terminos_y_condiciones">Términos y condiciones</Link>
				</li>
			</div>

			<div className="footer-content">
				<h4>Mi cuenta</h4>
				<li>
					<Link to="/login">Iniciar Sesión</Link>
				</li>
				<li>
					<Link to="/register">Registrarse</Link>
				</li>
				<li>
					<Link to="/vender">Vender</Link>
				</li>
			</div>
		</footer>
	);
};

export default Footer;
