import { useState } from "react";
import { validate } from "../utils/registerValidation";
import { useDispatch } from "react-redux";
//import { addUser } from "../redux/features/userSlice";
import { BiEnvelope, BiLockAlt, BiImage } from "react-icons/bi";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineUser,
} from "react-icons/ai";
// import axios from "axios";
import { postUser } from "../services/userServices";
import { NewUser } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
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
            value={inputs.name}
            placeholder="Ingresa tu nombre"
            autoComplete="username"
            required
            onChange={(e) => handleInputs(e)}
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
            value={inputs.email}
            required
            onChange={(e) => handleInputs(e)}
          />
          <BiEnvelope className="icon" />
        </div>
        {errors.email && <p className="error">{errors.email}</p>}

        <div className="input-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Ingresa tu contraseña"
            value={inputs.password}
            required
            autoComplete="current-password"
            onChange={(e) => handleInputs(e)}
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
            value={inputs.image}
            placeholder="Ingresa una URL de tu imagen"
            required
            onChange={(e) => handleInputs(e)}
          />
          <BiImage className="icon" />
        </div>
        {errors.image && <p className="error">{errors.image}</p>}

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
