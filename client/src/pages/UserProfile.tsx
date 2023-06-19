import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateUser } from "../services/userServices";
import {changePassword} from "../redux/features/userSlice"
import { UserData } from "../utils/interfaces";



const UserProfile: React.FC = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const userLogin = useSelector((state: RootState) => state.user.userLogin);

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        
        try {
          const passwordData: UserData = {
            name: userLogin.name,
            lastName: userLogin.lastName,
            email: userLogin.email,
            id: userLogin.id,
            image: userLogin.image,
            password: newPassword
          };
      
          await updateUser(userLogin.id, passwordData);
          dispatch(changePassword(newPassword));
          console.log("Contraseña actualizada exitosamente");
          // Realiza las acciones necesarias después de actualizar la contraseña
        } catch (error) {
          console.log("Error al actualizar la contraseña:", error);
          // Maneja el error, muestra un mensaje de error, etc.
        }
      };
      
      
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
            <button onClick={handleSubmit}>Guardar contraseña</button>

          </div>
        </div>
      );
    };

export default UserProfile;
