import React from "react";

const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="footer-import">
					<div className="footer-contact">
						<h2>Sobre Nosotros</h2>
						<ul>
							<li>email: acaVaUnEmail@outlook.com</li>
							<li>
								<a href="/productos" className="footer-link">
									quienes somos
								</a>
							</li>
						</ul>
					</div>
					<div className="footer-Help">
						<h2>Ayuda</h2>
						<ul>
							<li>
								<a href="/terminos_y_condiciones" className="footer-link">
									Términos y Condiciones
								</a>
							</li>
							<li>
								<a
									href="/preguntas_precuentes"
									className="footer-link"
									target="_blank"
								>
									Preguntas Frecuentes
								</a>
							</li>
						</ul>
					</div>
					<div className="footer-security">
						<h2>Seguridad</h2>
						<ul>
							<li>
								<a
									href="https://www.argentina.gob.ar/economia/comercio/defensadelconsumidor"
									className="footer-link"
									target="_blank"
								>
									Defensa al Consumidor
								</a>
							</li>
							<li>
								<a href="/privacidad" className="footer-link" target="_blank">
									Privacidad
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<p>© 2023 Tu Sitio Web. Todos los derechos reservados.</p>
			</div>
		</footer>
	);
};

export default Footer;
