import { Link } from "react-router-dom";
import React from "react";
import logo from '../assets/marketplace_logo.png'

const VerificationPage: React.FC = () => {
  return (
    <div className="container-verification">
      <img src={logo} alt="logo" className="logo-verification" />
      <h1 className="title-verification">Verificación Exitosa</h1>
      <p className="text-verification">Tu cuenta ha sido verificada correctamente.</p>
      <p className="text-verification">Puedes acceder a todas las funcionalidades de la plataforma ahora.</p>
      <button className="button-verification">
        <Link to="/">Ir a la página principal</Link>
      </button>
    </div>
  );
};

export default VerificationPage;