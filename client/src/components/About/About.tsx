//! Componente smart
import DetailProfile from "./DetailProfile";
import { dataProfile, PropsProfile } from "./dataProfile";

const About = () => {
	return (
		<div className="conteiner-about">
			<section className="section-about">
				<h1>Sobre nosotros:</h1>
				<title>Sobre nosotros: </title>
				<h1>¡Hola a todos!</h1>
				<p>
					Permítanme presentarles a nuestro increíble equipo de desarrollo web,
					¡nosotros somos estudiantes de <strong>soyHenry</strong>! Somos un
					grupo de apasionados aprendices de programación y estamos emocionados
					de estar aquí hoy para compartir nuestro viaje en el mundo del
					desarrollo web <em>full-stack</em>.
				</p>
				<p>
					En <em>soyHenry</em>, hemos estado inmersos en un programa intensivo
					de <em>bootcamp</em>, donde hemos adquirido habilidades y
					conocimientos para convertirnos en desarrolladores web completos.
					Durante meses, hemos trabajado arduamente, enfrentando desafíos y
					superando obstáculos, todo con el objetivo de crecer personal y
					profesionalmente.
				</p>
				<p>
					En nuestro camino de aprendizaje, hemos explorado una amplia gama de
					tecnologías y herramientas, desde el desarrollo del lado del cliente
					con <strong>HTML</strong>, <strong>CSS</strong> y{" "}
					<strong>JavaScript</strong>, hasta el desarrollo del lado del servidor
					utilizando frameworks como <strong>Node.js</strong> y{" "}
					<strong>Express</strong>. Hemos aprendido a crear aplicaciones web
					dinámicas, bases de datos, autenticación de usuarios y mucho más.
				</p>
				<p>
					Pero lo más importante que hemos adquirido durante nuestra experiencia
					en <em>soyHenry</em> es la mentalidad de resolución de problemas y la
					capacidad de aprendizaje continuo. En el mundo del desarrollo web, la
					tecnología está en constante evolución y como desarrolladores, debemos
					mantenernos actualizados y adaptarnos rápidamente.
				</p>
				<p>
					Estamos aquí hoy porque creemos en la importancia de colaborar y
					compartir conocimientos. A medida que avanzamos en nuestras carreras,
					estamos emocionados de aplicar nuestras habilidades para crear
					soluciones innovadoras y marcar una diferencia en el mundo digital.
				</p>
				<p>
					Así que, con orgullo y entusiasmo, les presentamos a nosotros, los
					estudiantes de <em>soyHenry</em>, listos para enfrentar nuevos
					desafíos y hacer realidad ideas increíbles. ¡Gracias por estar aquí y
					por apoyarnos en nuestro viaje de desarrollo web!
				</p>
				<p>¡El futuro es nuestro!</p>
			</section>
			{/* //? Participantes */}
			<div className="conteiner-aboutCardProfile">
				{dataProfile.data.map((user: PropsProfile, index: number) => {
					return <DetailProfile {...user} key={index} />;
				})}
				<section>
				<p><strong>Sobre la aplicación 🤯😎</strong></p>

<p>Nuestra aplicación es un mercado online donde puedes explorar, buscar, filtrar y ordenar una amplia variedad de productos. También te brindamos la oportunidad de convertirte en vendedor, subir tus propios productos con imágenes y descripciones detalladas.</p>

<p>Además, los usuarios pueden dejar reseñas y puntuar los productos que han comprado, proporcionando información útil a otros compradores. Nos enfocamos en brindar una experiencia segura y confiable, con autenticación y protección de datos.</p>

<p>Sumérgete en nuestro emocionante mercado online y descubre un mundo de posibilidades para tus compras en línea. ¡Únete a nosotros ahora mismo! 💪🛍️</p>

				</section>
				<section>
				<h2>Tecnologías utilizadas 🦾</h2>

<h3>Front-end:</h3>

<ul>
	<li>
		React Vite: Un entorno de desarrollo rápido y optimizado para
		aplicaciones React.
	</li>
	<li>
		Redux Toolkit: Una biblioteca que facilita la gestión del estado en
		aplicaciones JavaScript utilizando el patrón de diseño Flux.
	</li>
	<li>
		TypeScript: Un lenguaje de programación que ofrece un mayor control
		sobre el código y detección temprana de errores.
	</li>
	<li>
		Sass: Un preprocesador de CSS que permite escribir código CSS de
		manera más eficiente y estructurada.
	</li>
	<li>
		ChartJS 2: Una librería de gráficos para visualizar datos en forma de
		gráficos en aplicaciones React.
	</li>
	<li>
		Dropzone: Una herramienta para la carga de archivos que facilita a los
		usuarios subir archivos de manera sencilla.
	</li>
</ul>

<h3>Back-end:</h3>

<ul>
	<li>
		Express.js: Un framework de servidor web para Node.js que simplifica
		la creación de aplicaciones web y API REST.
	</li>
	<li>
		JWT (JSON Web Token): Un estándar abierto para transmitir información
		de forma segura entre dos partes, utilizado para autenticación y
		autorización.
	</li>
	<li>
		Bcrypt: Una librería para el hashing de contraseñas y asegurar la
		seguridad de la información sensible.
	</li>
	<li>
		Sequelize: Un ORM (Object-Relational Mapping) para interactuar con la
		base de datos de manera sencilla y eficiente.
	</li>
	<li>
		MercadoPago Sandbox: Una plataforma de pagos online que permite a los
		usuarios realizar transacciones de prueba en un entorno de desarrollo
		seguro.
	</li>
</ul>

<h3>Otras herramientas y servicios:</h3>

<ul>
	<li>
		Railways y Vercel: Plataformas en la nube que permiten el despliegue y
		hosting de aplicaciones web.
	</li>
	<li>
		Trello: Una herramienta de gestión de proyectos para organizar y
		colaborar en proyectos de manera eficiente.
	</li>
	<li>
		Git + GitHub: Sistema de control de versiones distribuido y plataforma
		de alojamiento de código fuente y control de versiones.
	</li>
</ul>

<p>
	Estas tecnologías y herramientas nos permiten desarrollar aplicaciones
	web completas y funcionales, garantizando la seguridad, la eficiencia y
	la colaboración en el proceso de desarrollo.
</p>
				</section>
			</div>
		</div>
	);
};

export default About;
