import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, setUserValidator } from "../redux/features/userSlice";

import { RootState } from "../redux/store";
import {  UserData } from "../utils/interfaces";

// import { setLoggedInUserId } from "../redux/features/userSlice";

const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const user = useSelector((state: RootState) => state.user.userLogin);
	const users = useSelector((state: RootState) => state.user.users);
	const access = useSelector((state: RootState) => state.user.userValidation);

	const [localController, setLocalController] = useState(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	

	useEffect(() => {
		
		if (access) {
			localController && navigate("/");
		}
	}, [dispatch, access, navigate, localController]);

	const [formData, setFormData] = useState<UserData>({
		name: "",
		password: "",
		email: "",
		id: "",
		image: ""
	});

	const [message, setMessage] = useState("No has escrito nada");

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	

/* 	console.log('local', localController);
console.log('global' ,access);
	 */

	
const handleSubmit = async (event: React.FormEvent): Promise<void> => {
	event.preventDefault();
	console.log("Datos del formulario:", formData);

	if (formData.email) {
		const userFound = users.find((match: any) => match.email === formData.email);

		if (!userFound) {
			setMessage("Usuario no encontrado");
			setLocalController(false);
		} else if (userFound.password !== formData.password) {
			setMessage("Contraseña incorrecta");
			setLocalController(false);
		} else {
			setMessage("Usuario encontrado");
			setLocalController(true);
			setFormData({
				...formData,
				id: userFound.id,
				image: userFound.image,
			});
			dispatch(addUser(userFound));
			dispatch(setUserValidator(true));
		}
	}

	console.log("Datos del formulario:", formData);
};
	/* const  handleAccess = async() =>{
    const userFound =users.filter((match:any) => match.email === formData.email)
      setLocalController(true)
			const {id, image} = userFound[0];
			setFormData({
				...formData,
				id: id,
				image: image
			}) 
   return  Promise.resolve(userFound) 
    }*/


	return (
		<form className="login_form" onSubmit={handleSubmit}>
			<h2>Iniciar Sesión</h2>

			<div className="form_group">
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
				/>
			</div>
			<div className="form_group">
				<label htmlFor="password">Contraseña:</label>
				<input
					id="password"
					name="password"
					type={showPassword ? "text" : "password"}
					value={formData.password}
					onChange={handleChange}
				/>
				<button type="button" onClick={handleShowPassword}>
					Mostrar contraseña
				</button>
			</div>

			<button type="submit">{!access ? "Iniciar Sesión" : "Entrar"}</button>

			<Link to="/register">
				<p>¿No tienes cuenta?</p>
			</Link>

			{message && <p>{message}</p>}
		</form>
	);
};

export default Login;

