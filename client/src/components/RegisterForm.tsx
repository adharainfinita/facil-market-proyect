import { useState, ChangeEvent } from "react";
import { validate } from "../utils/registerValidation";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/features/userSlice";
import { BiEnvelope, BiLockAlt, BiImage } from "react-icons/bi";
import axios from "axios";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineUser,
} from "react-icons/ai";
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
  const [image, setImage] = useState("");

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
          setImage(uploadedFile.secure_url);
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
        name: inputs.name,
        lastName: inputs.lastName,
        password: inputs.password,
        email: inputs.email,
        image,
      };

      const response = await postUser(user);
      if (response.status === 201) {
        dispatch(addUser({ ...response.data }));
      }
      alert("Registro exitoso");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar el usuario", error);
    }

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
            autoComplete="off"
            required
            onChange={handleInputs}
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
            onChange={handleInputs}
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
            onChange={handleInputs}
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
        {errors.password && <p className="error">{errors.password}</p>}

        <div className="input-field">
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={uploadImage}
            defaultValue={image}
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
          ¿Tienes una cuenta?
          <a href="/login" className="text signup-text">
            Inicia sesión aquí
          </a>
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
