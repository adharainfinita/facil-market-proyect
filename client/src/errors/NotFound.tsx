import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
	return (
		<div>
			<h1>Error 404 - Página no encontrada</h1>
			<p>Lo sentimos, la página que estás buscando no existe.</p>
			<Link to="/">Volver a la página de inicio</Link>
		</div>
	);
};

export default NotFound;
