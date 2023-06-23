import React from "react";
import logo from "../assets/marketplace_logo.png";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";

const Footer: React.FC = () => {
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
					<a href="/products">Market</a>
				</li>
			</div>

			<div className="footer-content">
				<h4>Ayuda</h4>
				<li>
					<a href="/preguntas_precuentes">FAQS</a>
				</li>
				<li>
					<a href="#">Política de privacidad</a>
				</li>
				<li>
					<a href="/terminos_y_condiciones">Términos y condiciones</a>
				</li>
			</div>

			<div className="footer-content">
				<h4>Mi cuenta</h4>
				<li>
					<a href="/login">Iniciar Sesión</a>
				</li>
				<li>
					<a href="/register">Registrarse</a>
				</li>
				<li>
					<a href="/vender">Vender</a>
				</li>
			</div>
		</footer>
	);
};

export default Footer;
