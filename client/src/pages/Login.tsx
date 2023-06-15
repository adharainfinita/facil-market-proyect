import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/features/getUserSlice";
import { setUserValidator } from "../redux/features/userValidatorSlice";
import { RootState, AppDispatch } from "../redux/store";

interface UserData {
  password: string | number;
  email: string | number;
}

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.user);
  const userValidator = useSelector((state: RootState) => state.userValidator.value);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [formData, setFormData] = useState<UserData>({
    password: "",
    email: "",
  });

  const [message, setMessage] = useState("");

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
    console.log("Datos del formulario:", formData);

    const foundUser = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (foundUser) {
      setMessage("Identidad encontrada");
      dispatch(setUserValidator(true)); // Actualiza el estado userValidator a true
    } else {
      setMessage("Usuario no encontrado");
      dispatch(setUserValidator(false)); // Actualiza el estado userValidator a false
    }
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
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Iniciar Sesión</button>

      <Link to="/register">
        <p>¿No tienes cuenta?</p>
      </Link>

      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;
