import { useState } from "react";
import { validate } from "../utils/registerValidation";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, UserState } from "../redux/features/userSlice";
import axios from "axios";


interface NewUser {
  name: string;
  lastName: string;
  password: string;
  email: string;
  image: string;
  confirm?: string;
}

const Register = () => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState<NewUser>({
    name: "",
    lastName: "",
    password: "",
    email: "",
    image: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<NewUser>>({});
  const [confirmPsw, setConfirmPsw] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors(validate({...inputs, [e.target.name]: e.target.value }))
  };

const handleShowPassword = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowPassword(!showPassword)
}

const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setConfirmPsw(e.target.value)
    setErrors(validate({ ...inputs, [e.target.name]: e.target.value }))
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // Realizar la solicitud POST al back-end
      const response = await axios.post("http://localhost:3001/user", inputs);
  
      // Verificar la respuesta del servidor
      if (response.status === 201) {
        // El registro se creó exitosamente en la base de datos
        // Puedes manejar aquí la lógica de redirección o mostrar un mensaje de éxito
        dispatch(addUser(response.data));
        console.log("Registro exitoso");
      }
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
    setConfirmPsw("");
    setErrors({});
    setFormSubmitted(true);
  };


  return (
    <div className="register-container">
      <h2>Registro</h2>
      <button className="google-register">Registrarse con Google</button>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={(e) => handleInputs(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            name="lastName"
            value={inputs.lastName}
            onChange={(e) => handleInputs(e)}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={inputs.password}
              onChange={(e) => handleInputs(e)}
            />
            <button
              className="password-toggle"
              onClick={(e) => handleShowPassword(e)}
            >
              {!showPassword ? "Mostrar" : "Ocultar"}
            </button>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Confirmar contraseña:</label>
          <input 
            type="password" 
            name="confirm" 
            value={confirmPsw}
            onChange={(e) => handleConfirmPassword(e)} 
          />
          {errors.confirm && <p className="error">{errors.confirm}</p>}
        </div>


        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={(e) => handleInputs(e)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Imagen:</label>
          <input
            type="text"
            name="image"
            value={inputs.image}
            onChange={(e) => handleInputs(e)}
            placeholder="Ingrese una url"
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>

        <button className="submit-button">Registrarse</button>
      </form>

      <Link to="/login" className="login-link">
        <p>Ya tengo cuenta</p>
      </Link>
    </div>
  );
};

export default Register;