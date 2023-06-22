import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateUser } from "../services/userServices";
import { changeEmail, changePassword, changeName, changeImage } from "../redux/features/userSlice";
import { UserData } from "../utils/interfaces";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newImage, setNewImage] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const userLogin = useSelector((state: RootState) => state.user.userLogin);

  const handleFieldChange = async (): Promise<void> => {
    try {
      const updatedData: UserData = {
        name: newName !== "" ? newName : userLogin.name,
        lastName: userLogin.lastName,
        email: newEmail !== "" ? newEmail : userLogin.email,
        id: userLogin.id,
        image: newImage !== "" ? newImage : userLogin.image,
        password: newPassword !== "" ? newPassword : userLogin.password,
      };

      await updateUser(userLogin.id, updatedData);

      if (newPassword !== "") {
        dispatch(changePassword(newPassword));
        setIsPasswordChanged(true);
      }

      if (newEmail !== "") {
        dispatch(changeEmail(newEmail));
      }

      if (newName !== "") {
        dispatch(changeName(newName));
      }

      if (newImage !== "") {
        dispatch(changeImage(newImage));
      }

      // Realiza las acciones necesarias después de actualizar los campos
    } catch (error) {
      console.log("Error al actualizar los campos:", error);
    }
  };

  useEffect(() => {
    if (isPasswordChanged) {
      console.log("Contraseña actualizada exitosamente");
      // Realiza las acciones necesarias después de actualizar la contraseña
    }
  }, [isPasswordChanged]);

  return (
    <div className="Profile__conteiner">
      <div className="Profile__data">
        <img src={userLogin.image} alt="user" className="nav__userLogo" />
        <h2>Nombre: {userLogin.name}</h2>
        <h2>Apellido: {userLogin.lastName}</h2>
        <h2>Email: {userLogin.email}</h2>
        <h2>Contraseña: {showPassword ? userLogin.password : "********"}</h2>
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        </button>
        <p>Deseas cambiar tu contraseña?</p>
      </div>
      <div className="Profile__buys">
        <h2>mis compras</h2>
      </div>
      <div>
        <h2>Cambiar contraseña</h2>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleFieldChange}>Guardar contraseña</button>
      </div>
      <div>
        <h2>Cambiar nombre</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleFieldChange}>Guardar nombre</button>
      </div>
      <div>
        <h2>Cambiar email</h2>
        <input
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button onClick={handleFieldChange}>Guardar email</button>
      </div>
      <div>
        <h2>Cambiar imagen</h2>
        <input
          type="text"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
        <button onClick={handleFieldChange}>Guardar imagen</button>
      </div>
    </div>
  );
};

export default UserProfile;
