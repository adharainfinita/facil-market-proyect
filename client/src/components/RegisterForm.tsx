import { useState, ChangeEvent, FormEvent } from "react";
import { BiEnvelope, BiLockAlt, BiImage } from "react-icons/bi";
import {
	/* AiOutlineEyeInvisible,
	AiOutlineEye, */
	AiOutlineUser,
} from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";

const RegisterForm = () => {
  const {user} = useAuth();
	const { register } = useAuth();
	const [emailRegister, setEmailRegister] = useState<string>("");
	const [passwordRegister, setPasswordRegister] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [image, setImage] = useState<string>("");
	/* const [error, setError] = useState<string>(""); */

	const handleSubmit = async (
		event: FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();
		/* setError(""); */
		try {
      await register(emailRegister, passwordRegister);
          if (user) {
          await updateProfile(user, {
            displayName: name,
            photoURL: image,
          });
        }
      /* let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      if(!name) {
        return setError("El campo nombre no puede estar vacio.")
      }else if (!regexName.test(name)) {
        return setError("El campo nombre solo acepta letras.");
      }
      if (!emailRegister) {
        return setError("El campo Email no puede estar vacio.")
      }
      if (!passwordRegister) {
        return setError("El campo Password no puede estar vacio.")
      } */

			alert("Cuenta creada con exito!");
		} catch (error: any) {
			alert("Error al registrar: " + error.message);
		}
	};

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmailRegister(event.target.value);
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPasswordRegister(event.target.value);
	};

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		setImage(event.target.value);
	};

	return (
		<div className="form login">
			<span className="form-title">Registrarte</span>

			<form onSubmit={handleSubmit}>
				<div className="input-field">
					<input
						type="text"
						name="name"
						placeholder="Ingresa tu nombre completo"
						autoComplete="username"
						value={name}
						required
						onChange={handleNameChange}
					/>
					<AiOutlineUser className="icon" />
				</div>
        {/* {error && <p className="error">{error}</p>} */}
				<div className="input-field">
					<input
						type="text"
						name="email"
						id="email"
						placeholder="Ingresa tu correo"
						autoComplete="current-email"
						value={emailRegister}
						required
						onChange={handleEmailChange}
					/>
					<BiEnvelope className="icon" />
				</div>
       {/*  {error && <p className="error">{error}</p>} */}
				<div className="input-field">
					<input
						type="text"
						name="password"
						placeholder="Ingresa tu contraseña"
						value={passwordRegister}
						required
						autoComplete="current-password"
						onChange={handlePasswordChange}
					/>
					<BiLockAlt className="icon" />
				</div>
        {/* {error && <p className="error">{error}</p>} */}
				<div className="input-field">
					<input
						type="text"
						name="image"
						placeholder="Ingresa una URL de tu imagen"
						required
						value={image}
						onChange={handleImageChange}
					/>
					<BiImage className="icon" />
				</div>
        {/* {error && <p className="error">{error}</p>} */}
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

/* import { useState } from "react";
import { validate } from "../utils/registerValidation";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/features/userSlice";
import { BiEnvelope, BiLockAlt, BiImage } from "react-icons/bi";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineUser,
} from "react-icons/ai";
// import axios from "axios";

import { NewUser } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterForm = () => {
  const auth = useAuth()
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handleRegister = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault();
		auth.register(emailRegister, passwordRegister);
	}

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<NewUser>({
    name: "",
    lastName: "",
    password: "",
    email: "",
    image: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<NewUser>>({});
  const [_formSubmitted, setFormSubmitted] = useState(false);

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
    setErrors(validate({ ...inputs, [name]: value }));
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
      // Realizar la solicitud POST al back-end
      // const response = await axios.post("http://localhost:3001/user", inputs);
      const response = await postUser(inputs);
      // Verificar la respuesta del servidor
      if (response.status === 201) {
        // El registro se creó exitosamente en la base de datos
        // Puedes manejar aquí la lógica de redirección o mostrar un mensaje de éxito
        dispatch(addUser(response.data));
      }
      alert("Registro exitoso");
      navigate("/login");
    } catch (error) {
      // Ocurrió un error al procesar la solicitud
      // Puedes manejar aquí la lógica de manejo de errores

      console.error("Error al registrar el usuario", error);
    }

    // Restablecer los valores de los inputs y otros estados relevantes
    setInputs({
      name: "",
      lastName: "",
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

      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="text"
            name="name"
            value={displayName}
            placeholder="Ingresa tu nombre"
            autoComplete="username"
            required
            onChange={(event) => setDisplayName(event.target.value)}
          />
          <AiOutlineUser className="icon" />
        </div>
        {errors.name && <p className="error">{errors.name}</p>}
        <div className="input-field">
          <input
            type="text"
            name="lastName"
            placeholder="Ingresa tu Apellido"
            autoComplete="lastName"
            value={inputs.lastName}
            required
            onChange={(e) => handleInputs(e)}
          />
          <AiOutlineUser className="icon" />
        </div>
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <div className="input-field">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Ingresa tu correo"
            autoComplete="current-email"
            value={emailRegister}
            required
            onChange={(event) => setEmailRegister(event.target.value)}
          />
          <BiEnvelope className="icon" />
        </div>
        {errors.email && <p className="error">{errors.email}</p>}

        <div className="input-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Ingresa tu contraseña"
            value={passwordRegister}
            required
            autoComplete="current-password"
            onChange={(event) => setPasswordRegister(event.target.value)}
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
        {errors.password && <p className="error">{errors.password}</p>}

        <div className="input-field">
          <input
            type="text"
            name="image"
            value={photoURL}
            placeholder="Ingresa una URL de tu imagen"
            required
            onChange={(event) => setPhotoURL(event.target.value)}
          />
          <BiImage className="icon" />
        </div>
        {errors.image && <p className="error">{errors.image}</p>}

        <div className="input-field button">
          <input type="submit" value="Registrarte" onClick={(event) => handleRegister(event)} />
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
 */
