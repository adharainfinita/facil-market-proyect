import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, addUser, setUserValidator  } from "../redux/features/userSlice";
// import { fetchUsers } from "../redux/features/getUserSlice";
import { RootState } from "../redux/store";
import { UserData } from "../utils/interfaces";
// import { getAllUsers } from "../services/userServices";




const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userLogin);
  const users = useSelector((state: RootState) => state.user.users);
  const access = useSelector((state: RootState) => state.user.userValidation);

  const [localController, setLocalController] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // const userValidator = useSelector((state: RootState) => state.userValidator.value);

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/user`)
       .then(response => response.json())
       .then(data => dispatch(getUsers(data)))
       }
       catch (error) {
       console.log(error);
   } 
  
    }, [dispatch, access, localController]);

console.log('local', localController);
console.log('global' ,access);


  const [formData, setFormData] = useState<UserData>({
    password: "",
    email: "",
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
  
  
 
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
   
      dispatch(addUser(formData));

    console.log("Datos del formulario:", formData);
    const userFound = users.filter(match => match.email === user.email)
    console.log(userFound);
    if(userFound.length) {
      setLocalController(true);
      handleRedirection()
    }
     if(!userFound.length) {
      setMessage("Usuario no encontrado")
    setLocalController(false)
     }
      // dispatch(setUserValidator(false)); // Actualiza el estado userValidator a false
    }

  const  handleRedirection = () =>{
   
      dispatch(setUserValidator(true));
      if(access){
     localController && navigate('/')
    }

    }
  
  const handleShowPassword = () => { 
    setShowPassword(!showPassword); 
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
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
        />
        <button type="button" onClick={handleShowPassword}>Mostrar contraseña</button>
      </div>

      <button type="submit">{!access ? 'Iniciar Sesión': 'Entrar'}</button>

      <Link to="/register">
        <p>¿No tienes cuenta?</p>
      </Link>

      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;