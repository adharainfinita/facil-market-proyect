import React, { useState } from "react";
import { Link } from "react-router-dom";

interface UserData {
  password: string | number;
  email: string | number;
}

const Login: React.FC = () => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState<UserData>({
    password: "",
    email: "",
  });

  // Manejador de cambios para los campos del formulario
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Manejador para el envío del formulario
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Datos del formulario:", formData);
    // Aquí puedes realizar lógica adicional, como enviar los datos al servidor, etc.
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
      
      <Link to="/register"><p>¿no tienes cuenta?</p></Link>
    </form>
  );
};

export default Login;
