import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateUser } from "../services/userServices";
import { changeEmail, changePassword, changeName, changeImage } from "../redux/features/userSlice";
import { user } from "../utils/interfaces";
import axios from "axios";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newImage, setNewImage] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const userLogin = useSelector((state: RootState) => state.user.userLogin.user);

  const handleFieldChange = async (): Promise<void> => {
    try {
      const updatedData: user = {
        fullName: newName !== "" ? newName : userLogin.fullName,
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
    } catch (error) {
      console.log("Error al actualizar los campos:", error);
    }
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
          setNewImage(uploadedFile.secure_url);
        } catch (error) {
          console.error("Error al subir la imagen", error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isPasswordChanged) {
      console.log("Contraseña actualizada exitosamente");
    }
  }, [isPasswordChanged]);

  return (
    <div className="Profile__conteiner">
      <div className="Profile__data">
        <img src={userLogin.image} alt="user" className="nav__userLogo" />
        <h2>Nombre: {userLogin.fullName}</h2>
  
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
          type="file"
          accept="image/*"
          onChange={uploadImage}
        />
        <button onClick={handleFieldChange}>Guardar imagen</button>
      </div>
    </div>
  );
};

export default UserProfile;
