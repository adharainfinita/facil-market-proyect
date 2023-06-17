import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, setUserValidator } from "../redux/features/userSlice";

import { RootState } from "../redux/store";
import { UserData } from "../utils/interfaces";

import { setLoggedInUserId } from "../redux/features/userSlice";

const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user.userLogin);
	const users = useSelector((state: RootState) => state.user.users);
	const access = useSelector((state: RootState) => state.user.userValidation);

	const [localController, setLocalController] = useState(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	useEffect(() => {
		if (access) {
			navigate("/");
		}
	}, [dispatch, access, navigate, localController]);

	const [formData, setFormData] = useState<UserData>({
		password: "",
		email: "",
		id: "",
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

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		dispatch(addUser(formData));

		console.log("Datos del formulario:", formData);
		const response = handleAccess();

		console.log(response);
		if (response.length) {
			setLocalController(true);
		}
		if (!response.length) {
			setMessage("Usuario no encontrado");
			setLocalController(false);
		}
	};

	const handleAccess = () => {
		const userFound = users.filter((match) => match.email === user.email);
		if (userFound.length) {
			dispatch(setLoggedInUserId(userFound[0].id)); // Actualiza el ID del usuario logueado
			dispatch(setUserValidator(true));
		}
		return userFound;
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

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

/* import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, setLoggedInUserId, setUserValidator } from "../redux/features/userSlice";
import { RootState } from "../redux/store";
import { UserData } from "../utils/interfaces";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userLogin);
  const users = useSelector((state: RootState) => state.user.users);
  const access = useSelector((state: RootState) => state.user.userValidation);

  const [formData, setFormData] = useState<UserData>({
    password: "",
    email: "",
    id: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(addUser(formData));
    console.log("Datos del formulario:", formData);

    const userFound = users.filter((match) => match.email === formData.email);

    if (userFound.length) {
      dispatch(setLoggedInUserId(userFound[0].id));
      dispatch(setUserValidator(true));
      navigate("/");
    } else {
      setErrorMessage("Usuario no encontrado");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default Login; */
