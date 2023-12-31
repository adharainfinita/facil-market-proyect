import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { LoginData } from "../utils/interfaces";
import { getAllUsers, logUser } from "../services/userServices";
import { getUsers, loggedUser } from "../redux/features/userSlice";
import { RiErrorWarningLine } from "react-icons/ri";
import GoogleAuth from "../components/GoogleAuth";
import { toast, ToastContainer } from "react-toastify";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const updateMessage = (newMessage: string) => {
    setMessage(newMessage);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();

        if (response) {
          dispatch(getUsers(response));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [dispatch]);

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
    try {
      const response = await logUser(formData);

      if (response.user.active === false) {
        setMessage("Tu cuenta ha sido desactivada");
        return;
      }

      const token = response.token;
      window.localStorage.setItem("token", token);

      if (response) {
        dispatch(loggedUser(response));
        toast.success("Sesión iniciada!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      }
    } catch (error) {
      setMessage(`${error}`);
      console.error(error);
    }
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
            {message && (
              <p className="error-message">
                <RiErrorWarningLine className="error-icon" /> {message}
              </p>
            )}

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
            <div className="google-login">
              <GoogleAuth updateMessage={updateMessage} />
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
