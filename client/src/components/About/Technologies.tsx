import react from "../../assets/icons/reacts.svg";
import reduxToolkit from "../../assets/icons/reduxToolkit.svg";
import sass from "../../assets/icons/sass.svg";
import nodeJs from "../../assets/icons/nodejs.svg";
import typescript from "../../assets/icons/typescript.svg";
import jwt from "../../assets/icons/jwt.svg";
import charJs from "../../assets/icons/chartjs.svg";
import dropzone from "../../assets/icons/dropzone.svg";
import bcrypt from "../../assets/icons/bcrypt.svg";
import expressJS from "../../assets/icons/expressjs.svg";
import sequelize from "../../assets/icons/sequelize.svg";
import mercadopago from "../../assets/icons/mercado-pago.svg";
import vercel from "../../assets/icons/vercel.svg";
import trello from "../../assets/icons/trello.svg";
import gitHub from "../../assets/icons/github.svg";
import git from "../../assets/icons/git.svg";

const Technologies = () => {
	return (
		<>
			<h1>Tecnologías utilizadas 🦾</h1>

			<div className="about-tech-conteiner">
				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={react}
							alt="react-icon"
						></img>
						<h2 className="about-tech-section-title">React</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							React es una biblioteca de JavaScript para construir interfaces de
							usuario interactivas y reutilizables. Permite crear componentes
							independientes y gestionar eficientemente el estado de la
							aplicación, lo que facilita el desarrollo de aplicaciones web
							rápidas y escalables. Su enfoque basado en componentes y virtual
							DOM mejora el rendimiento y la experiencia del usuario.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={reduxToolkit}
							alt="reduxToolkit-icon"
						></img>
						<h2 className="about-tech-section-title">Redux Toolkit</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							Redux Toolkit es una biblioteca de Redux que simplifica el
							desarrollo de aplicaciones al proporcionar herramientas y
							abstracciones. Reduce el boilerplate, facilita la configuración
							predeterminada de Redux, maneja acciones asíncronas y promueve la
							inmutabilidad del estado. Es ideal para desarrollar aplicaciones
							basadas en Redux de manera eficiente y organizada.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={typescript}
							alt="typescript-icon"
						></img>
						<h2 className="about-tech-section-title">TypeScript</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							TypeScript es un lenguaje de programación que amplía JavaScript al
							proporcionar un sistema de tipos estático opcional y otras
							características avanzadas. Al agregar tipos estáticos, TypeScript
							ayuda a detectar errores en el código durante el desarrollo y
							mejora la legibilidad y mantenibilidad del código. Es
							especialmente útil en proyectos grandes y complejos, así como en
							el desarrollo de aplicaciones web y de backend.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={nodeJs}
							alt="sass-icon"
						></img>
						<h2 className="about-tech-section-title">NodeJS</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							Node.js es un entorno de ejecución de JavaScript del lado del
							servidor que permite construir aplicaciones web y de red altamente
							escalables. Con su modelo de programación basado en eventos y su
							capacidad para manejar conexiones en tiempo real, Node.js es ideal
							para aplicaciones de alta concurrencia y tiempo real como chats,
							streaming y API.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={sass}
							alt="sass-icon"
						></img>
						<h2 className="about-tech-section-title">Sass</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							Sass es un preprocesador de CSS que permite escribir código CSS de
							manera más eficiente y estructurada. Con Sass, puedes utilizar
							variables, anidamiento de selectores, mixins, funciones y
							operadores matemáticos, lo que facilita la escritura y el
							mantenimiento de hojas de estilo. Además, Sass permite la creación
							de archivos parciales que se pueden importar en otros archivos
							para una mayor modularidad y reutilización de código.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={charJs}
							alt="chartJS-icon"
						></img>
						<h2 className="about-tech-section-title">ChartJS</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							Chart.js es una biblioteca de JavaScript que facilita la creación
							de gráficos interactivos y visualmente atractivos en aplicaciones
							web. Proporciona una amplia gama de tipos de gráficos, como
							barras, líneas, tortas y más. Con una sintaxis sencilla y
							flexible, se puede personalizar el diseño, los colores y las
							animaciones de los gráficos. Además, es compatible con diferentes
							navegadores y se integra fácilmente con otros frameworks y
							bibliotecas.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={dropzone}
							alt="dropzone-icon"
						></img>
						<h2 className="about-tech-section-title">Dropzone</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							Dropzone es una biblioteca de JavaScript de arrastrar y soltar
							archivos que permite a los usuarios cargar archivos de forma
							intuitiva en aplicaciones web. Proporciona una interfaz de usuario
							amigable, soporte para múltiples archivos y la capacidad de
							mostrar vistas previas de los archivos antes de la carga. Es
							altamente personalizable y compatible con diferentes navegadores y
							frameworks.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={expressJS}
							alt="expressJS-icon"
						></img>
						<h2 className="about-tech-section-title">Express JS</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							Express es un framework minimalista y flexible para construir
							aplicaciones web en Node.js. Proporciona una capa de abstracción
							sobre las funcionalidades básicas de Node.js, facilitando la
							creación de servidores y el manejo de rutas, peticiones HTTP,
							cookies y más. Con su enfoque ligero y su amplia comunidad de
							usuarios, Express.js es una opción popular para desarrollar
							aplicaciones web rápidas y escalables.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={jwt}
							alt="jwt-icon"
						></img>
						<h2 className="about-tech-section-title">JSON web Token</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							JWT es una biblioteca de JavaScript que permite la creación y
							verificación de tokens JSON Web en aplicaciones web y servicios
							API. Proporciona una forma segura de autenticación y autorización,
							generando tokens firmados con una clave secreta para verificar la
							identidad del usuario. Es ampliamente utilizado en entornos de
							desarrollo modernos para la implementación de autenticación basada
							en tokens.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={bcrypt}
							alt="bcrypt-icon"
						></img>
						<h2 className="about-tech-section-title">Bcrypt</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							Bcrypt es una biblioteca de cifrado de contraseñas para
							aplicaciones web. Utiliza una función de hashing robusta y un
							algoritmo de salting para almacenar las contraseñas de forma
							segura. Es fácil de usar, eficiente y proporciona una capa
							adicional de seguridad para proteger las credenciales de los
							usuarios en aplicaciones.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={sequelize}
							alt="sequelize-icon"
						></img>
						<h2 className="about-tech-section-title">Sequelize</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							Sequelize es un ORM (Object-Relational Mapping) para Node.js que
							simplifica la interacción con bases de datos relacionales.
							Proporciona una capa de abstracción que permite realizar consultas
							y manipulaciones de datos utilizando objetos y métodos en lugar de
							sentencias SQL directas. Es compatible con varios dialectos de
							bases de datos y facilita el desarrollo de aplicaciones escalables
							y mantenibles.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={mercadopago}
							alt="mercadopago-icon"
						></img>
						<h2 className="about-tech-section-title">MercadoPago</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							MercadoPago es una plataforma de pagos en línea que ofrece
							soluciones para realizar transacciones seguras en aplicaciones y
							sitios web. Permite aceptar pagos con tarjetas de crédito, débito
							y otros métodos, gestionar suscripciones, generar informes y
							ofrecer una experiencia de pago fácil y confiable a los usuarios.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={vercel}
							alt="vercel-icon"
						></img>
						<h2 className="about-tech-section-title">Vercel</h2>
					</div>
					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							Vercel es una plataforma de alojamiento y despliegue de
							aplicaciones web que permite a los desarrolladores implementar
							fácilmente sus proyectos. Proporciona un enfoque simple y rápido
							para lanzar aplicaciones estáticas y de servidor, con
							escalabilidad automática y una integración continua fluida.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={trello}
							alt="trello-icon"
						></img>
						<h2 className="about-tech-section-title">Trello</h2>
					</div>
					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							Trello es una herramienta de gestión de proyectos basada en
							tableros virtuales. Permite organizar tareas, asignarlas a
							miembros del equipo, establecer fechas límite y colaborar en
							tiempo real. Es intuitiva y fácil de usar, ideal para el
							seguimiento de proyectos y la coordinación de equipos.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={git}
							alt="git-icon"
						></img>
						<h2 className="about-tech-section-title">Git</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							Git es un sistema de control de versiones distribuido utilizado
							para rastrear cambios en archivos y coordinar el trabajo en
							proyectos de desarrollo de software. Permite el trabajo en equipo,
							ramificación y fusión de código, y facilita la colaboración y el
							seguimiento de modificaciones en el tiempo de manera eficiente y
							segura.
						</p>
					</div>
				</section>

				<section className="about-tech-section">
					<div className="about-tech-section-conteiner">
						<img
							className="about-tech-section-img"
							src={gitHub}
							alt="gitHub-icon"
						></img>
						<h2 className="about-tech-section-title">GitHub</h2>
					</div>

					<div className="about-tech-section-conteiner-parrafo">
						<p className="about-tech-section-parrafo">
							GitHub es una plataforma de alojamiento y colaboración de código
							fuente. Permite a los desarrolladores almacenar, gestionar y
							compartir repositorios de código, realizar seguimiento de
							problemas y realizar colaboraciones con otros desarrolladores. Es
							ampliamente utilizado en la comunidad de desarrollo de software
							para el control de versiones y el trabajo en equipo.
						</p>
					</div>
				</section>
			</div>
		</>
	);
};

export default Technologies;
