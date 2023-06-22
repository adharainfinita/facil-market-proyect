import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, setUserValidator } from "../redux/features/userSlice";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { RootState } from "../redux/store";
import { UserData } from "../utils/interfaces";
import { useAuth } from "../context/AuthContext";
import {useNavigate, Link} from "react-router-dom"
// import { setLoggedInUserId } from "../redux/features/userSlice";

const Login: React.FC = () => {
	const auth = useAuth()
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");


	const handleLogin = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault();
		const accesss = auth.login(email, password);
		console.log(accesss)
		if(!accesss){
			alert("Usuario o contraseña incorrecta")
		}else{
			navigate("/")
		}
	}

	/* const dispatch = useDispatch(); */
	/* const { users, userValidation: access } = useSelector(
		(state: RootState) => state.user
	); */

	const [localController, setLocalController] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	/* useEffect(() => {
		if (access) {
			localController && navigate("/");
		}
	}, [dispatch, access, navigate, localController]);

	const [formData, setFormData] = useState<UserData>({
		name: "",
		password: "",
		email: "",
		id: "",
		image: "",
	}); */

	/* useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await getAllUsers();
				if (response) {
					dispatch(getUsers(response));
				}
			} catch (error: any) {
				console.log(error);
			}
		};
		fetchUsers();
	}, [dispatch, getAllUsers]); */

	const [_message, setMessage] = useState("No has escrito nada");

/* 	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	}; */

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	/* 	console.log('local', localController);
console.log('global' ,access);
	 */

	/* const handleSubmit = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault();
		//dispatch(addUser(formData));
		if (formData.email) {
			const response = await handleAccess(); 

			if (!response[0]) {
				setMessage("Usuario no encontrado");
				setLocalController(false);
			} else {
				setMessage("Usuario encontrado");

				dispatch(addUser(response[0]));
				dispatch(setUserValidator(true));
			}
		}
	}; */
	/* const handleAccess = async () => {
		const userFound = users.filter(
			(match: any) => match.email === formData.email
		);
		setLocalController(true);

		if (userFound.length > 0) {
			const { id, image } = userFound[0];
			setFormData({
				...formData,
				id: id,
				image: image,
			});
			return Promise.resolve(userFound);
		}else{
			return Promise.resolve([]);
		}
	}; */

	return (
		<div className="container-form">
			<div className="forms">
				<div className="form login">
					<span className="form-title">Iniciar Sesión</span>

					<form >
						<div className="input-field">
							<input
								type="text"
								name="email"
								id="email"
								placeholder="Ingresa tu correo"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								autoComplete="username"
								required
							/>
							<BiEnvelope className="icon" />
						</div>

						<div className="input-field">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								id="password"
								placeholder="Ingresa tu contraseña"
								required
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								autoComplete="current-password"
							/>
							<BiLockAlt className="icon" />

							{showPassword ? (
								<AiOutlineEye
									onClick={handleShowPassword}
									className="showHidePw"
								/>
							) : (
								<AiOutlineEyeInvisible
									onClick={handleShowPassword}
									className="showHidePw"
								/>
							)}
						</div>

						<div className="checkbox-text">
							<div className="checkbox-content">
								<input type="checkbox" id="logCheck" />
								<label className="text" htmlFor="logCheck">
									Recordarme
								</label>
							</div>
							<a href="#" className="text">
								¿Olvidaste tu contraseña?
							</a>
						</div>

						<div className="input-field button">
							<input type="submit" value="Iniciar Sesión" onClick={(event) => handleLogin(event)}/>
						</div>
					</form>
					<div className="login-signup">
						<span className="text">
							¿Aún no tienes una cuenta?
							<a href="/register" className="text signup-text">
								Regístrate aquí
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
