import React from "react";
import { Link } from "react-router-dom";

const LoginExists: React.FC = () => {
	return (
		<div>
			<h1>Ya tienes una sesión activa</h1>
			<p>
				Haz clic en el enlace para ir a la página de inicio:{" "}
				<Link to="/">Inicio</Link>
			</p>
		</div>
	);
};

export default LoginExists;
