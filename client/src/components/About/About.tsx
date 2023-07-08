//! Componente smart
import Technologies from "./Technologies";
import DetailProfile from "./DetailProfile";
import { dataProfile, PropsProfile } from "./dataProfile";

const About = () => {
	return (
		<div className="about-conteiner">
			<article className="about-article">
				<h1>Sobre nosotros ❤️</h1>
				<p className="about-article-parrafo">
					Permítanme presentarles a nuestro increíble equipo de desarrollo web.
					¡Nosotros somos estudiantes de <strong>SoyHenry</strong>! Somos un
					grupo de apasionados aprendices de programación y estamos emocionados
					de estar aquí hoy para compartir nuestro viaje en el mundo del
					desarrollo web. A pesar de las dificultades, nunca nos rendimos y
					seguimos adelante con determinación. Aunque aún queda mucho camino por
					recorrer, estamos orgullosos de alcanzar nuestros objetivos.
				</p>
				<p>
					{" "}
					<i>
						"Los logros más grandes vienen de aquellos que nunca se rinden,
						incluso cuando las circunstancias son difíciles."
					</i>
				</p>
			</article>

			<div className="about-conteiner-detail">
				{dataProfile.data.map((user: PropsProfile, index: number) => {
					return <DetailProfile {...user} key={index} />;
				})}
			</div>

			<article className="about-article">
				<h1>
					<strong>Sobre la aplicación 😎</strong>
				</h1>

				<p className="about-article-parrafo">
					Nuestra aplicación es un market-place donde puedes explorar, buscar,
					filtrar y ordenar una amplia variedad de productos. También te
					brindamos la oportunidad de convertirte en vendedor, subir tus propios
					productos con imágenes y descripciones detalladas.
				</p>

				<p className="about-article-parrafo">
					Además, los usuarios pueden dejar reseñas y puntuar los productos que
					han comprado, proporcionando información útil a otros compradores. Nos
					enfocamos en brindar una experiencia segura y confiable, con
					autenticación y protección de datos.
				</p>

				<p className="about-article-parrafo">
					Sumérgete en nuestra emocionante aplicación y descubre un mundo de
					posibilidades para tus compras en línea. ¡Únete a nosotros ahora
					mismo! 💪🛍️
				</p>
			</article>

			<div className="about-tech-conteiner-principal">
				<Technologies />
			</div>
		</div>
	);
};

export default About;
