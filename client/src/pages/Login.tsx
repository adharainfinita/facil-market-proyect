import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, setUserValidator } from "../redux/features/userSlice";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { RootState } from "../redux/store";
import { UserData } from "../utils/interfaces";
import { getUsers } from "../redux/features/userSlice";

// import { setLoggedInUserId } from "../redux/features/userSlice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, userValidation: access } = useSelector(
    (state: RootState) => state.user
  );

  const [localController, setLocalController] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/user`)
        .then((response) => response.json())
        .then((data) => dispatch(getUsers(data)));

      /* fetch(`http://localhost:3001/product`)
				.then((response) => response.json())
				.then((data) => dispatch(getProducts(data)));*/
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

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
    image: "",
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

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    // dispatch(addUser(formData));
    console.log("Datos del formulario:", formData);
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

    console.log("Datos del formulario:", formData);
  };
  const handleAccess = async () => {
    const userFound = users.filter(
      (match: any) => match.email === formData.email
    );
    setLocalController(true);
    const { id, image } = userFound[0];
    setFormData({
      ...formData,
      id: id,
      image: image,
    });
    return Promise.resolve(userFound);
  };

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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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
              <input type="submit" value="Iniciar Sesión" />
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
