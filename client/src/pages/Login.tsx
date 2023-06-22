import { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import {useNavigate} from "react-router-dom"

const Login = () => {
  const { login, loginWithGoogle, resetPassword, user } = useAuth();
  const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string>("");

	const handleSubmit = async (
		event: FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();
		setError("");
		try {
      if (!email) {
        return setError("El campo Email no puede estar vacio.")
      }
      if (!password) {
        return setError("El campo Password no puede estar vacio.")
      }

			await login(email, password)
			
		} catch (error: any) {
			return setError(error.message);
    }
	};
	
	const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
			if(user){
				navigate("/products");
				alert(`El usuario está autenticado: ${email}`);
			}else{
				navigate("/login")
				alert("El usuario no está autenticado");
			}
    } catch (error:any) {
      return error.message;
    }
  };

	const handleResetPassword = async () => {
    if (email) return setError("Por favor introduzca su correo electrónico.")
    
    try {
      await resetPassword(email)
      setError("Le enviamos un correo electrónico con un enlace para restablecer su contraseña.")
    } catch (error) {
      console.error(error)
    }
  }

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	/* const dispatch = useDispatch(); */
	/* const { users, userValidation: access } = useSelector(
		(state: RootState) => state.user
	); */

/* 	const [localController, setLocalController] = useState(false); */

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

	/* const [_message, setMessage] = useState("No has escrito nada"); */

/* 	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	}; */

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

					<form onSubmit={handleSubmit}>
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
						{error && <p className="error">{error}</p>}

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
						{error && <p className="error">{error}</p>}

						<div className="checkbox-text">
							<div className="checkbox-content">
								<input type="checkbox" id="logCheck" />
								<label className="text" htmlFor="logCheck">
									Recordarme
								</label>
							</div>
							{/* <a href="#" className="text">
								¿Olvidaste tu contraseña?
							</a> */}
						</div>
							<button onClick={handleResetPassword} >¿Olvidaste tu contraseña?</button>

						<div className="input-field button">
							<input type="submit" value="Iniciar Sesión" />
						</div>
						<button onClick={handleGoogleSignIn}>
							Google
						</button>
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
