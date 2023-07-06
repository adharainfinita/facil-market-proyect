import { useState } from "react";
import { validate } from "../utils/registerValidation";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/features/userSlice";
import { BiEnvelope, BiLockAlt, BiImage } from "react-icons/bi";
import axios from "axios";
import {
	AiOutlineEyeInvisible,
	AiOutlineEye,
	AiOutlineUser,
} from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { postUser } from "../services/userServices";
import { NewUser } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import GoogleRegister from "./GoogleRegister";
import swal from 'sweetalert'


const RegisterForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const defaultImage = useSelector(
		(state: RootState) => state.user.userLogin.user.image
	);

	const [inputs, setInputs] = useState<NewUser>({
		fullName: "",
		password: "",
		confirm: "",
		email: "",
		image: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [errors, setErrors] = useState<Partial<NewUser>>({});
	const [_formSubmitted, setFormSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setInputs({ ...inputs, [name]: value });
		setErrors(validate({ ...inputs, [name]: value }));
	};
	const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const file = event.target.files;
			if (file && file.length > 0) {
				const data = new FormData();
				data.append("file", file[0]);
				data.append("upload_preset", "user_images");
				try {
					const res = await axios.post(
						"https://api.cloudinary.com/v1_1/facilmarket/image/upload",
						data
					);
					const uploadedFile = res.data;
					setInputs({ ...inputs, image: uploadedFile.secure_url });
				} catch (error) {
					console.error("Error al subir la imagen", error);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleShowPassword = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const user = {
				fullName: inputs.fullName,
				password: inputs.password,
				email: inputs.email,
				image: inputs.image ? inputs.image : defaultImage,
			};

			const response = await postUser(user);

			if (response.status === 201) {
				dispatch(addUser(response.data));
			}
			swal("Registro existoso!", "Ahora puedes acceder a todas las funcionalidades", "success");
			navigate("/login");
		} catch (error) {
			console.error(error);
			setErrorMessage(`${error}`);
		}

		setInputs({
			fullName: "",
			password: "",
			email: "",
			image: "",
		});
		setErrors({});
		setFormSubmitted(true);
	};

	return (
		<div className="form login">
			<span className="form-title">Registrarte</span>
			<div className="google-login">
				<GoogleRegister />
			</div>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="input-field">
					<input
						type="text"
						name="fullName"
						value={inputs.fullName}
						placeholder="Ingresa tu nombre completo"
						autoComplete="fullName"
						required
						onChange={handleInputs}
					/>
					<AiOutlineUser className="icon" />
				</div>
				{errors.fullName && (
					<p className="error">
						<RiErrorWarningLine className="error-icon" /> {errors.fullName}
					</p>
				)}

				<div className="input-field">
					<input
						type="text"
						name="email"
						id="email"
						placeholder="Ingresa tu correo"
						autoComplete="current-email"
						value={inputs.email}
						required
						onChange={handleInputs}
					/>
					<BiEnvelope className="icon" />
				</div>
				{errors.email && (
					<p className="error">
						<RiErrorWarningLine className="error-icon" /> {errors.email}
					</p>
				)}

				<div className="input-field">
					<input
						type={showPassword ? "text" : "password"}
						name="password"
						placeholder="Ingresa tu contraseña"
						value={inputs.password}
						required
						autoComplete="current-password"
						onChange={handleInputs}
					/>
					<BiLockAlt className="icon" />
				</div>
				{errors.password && (
					<p className="error">
						<RiErrorWarningLine className="error-icon" /> {errors.password}
					</p>
				)}

				<div className="input-field">
					<input
						type={showPassword ? "text" : "password"}
						name="confirm"
						placeholder="Confirma tu contraseña"
						value={inputs.confirm}
						required
						autoComplete="confirm-password"
						onChange={handleInputs}
					/>
					<BiLockAlt className="icon" />

					{showPassword ? (
						<AiOutlineEye onClick={handleShowPassword} className="showHidePw" />
					) : (
						<AiOutlineEyeInvisible
							onClick={handleShowPassword}
							className="showHidePw"
						/>
					)}
				</div>
				{errors.confirm && (
					<p className="error">
						<RiErrorWarningLine className="error-icon" /> {errors.confirm}
					</p>
				)}

				<div className="input-field">
					<input
						type="file"
						accept="image/*"
						name="image"
						onChange={uploadImage}
						defaultValue={inputs.image}
					/>
					<BiImage className="icon" />
				</div>
				{errorMessage && (
					<p className="error-message">
						<RiErrorWarningLine className="error-icon" /> {errorMessage}
					</p>
				)}
				<div className="input-field button">
					<input type="submit" value="Registrarte" />
				</div>
			</form>
			<div className="login-signup">
				<span className="text">
					¿tienes una cuenta?
					<a href="/login" className="text signup-text">
						Inicia sesión aqui
					</a>
				</span>
			</div>
		</div>
	);
};

export default RegisterForm;
