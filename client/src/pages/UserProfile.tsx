import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateUser } from "../services/userServices";
import { changeEmail, changePassword, changeName, changeImage } from "../redux/features/userSlice";
import { user  } from "../utils/interfaces";
import axios from "axios";
import { Link } from "react-router-dom";
/* import { getAllProducts } from "../redux/features/productSlice"; */
/* import { getAllProducts } from "../services/productServices"; */

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newImage, setNewImage] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const userLogin = useSelector((state: RootState) => state.user.userLogin);
  const products = useSelector((state: RootState) => state.product.originalCopy);
  
  const productsUser = products.filter(producto => producto.userID === userLogin.user.id);

  const handleFieldChange = async (): Promise<void> => {
    try {
      const updatedData: user  = {
        fullName: newName !== "" ? newName : userLogin.user.fullName,
        email: newEmail !== "" ? newEmail : userLogin.user.email,
        id: userLogin.user.id,
        image: newImage !== "" ? newImage : userLogin.user.image,
        password: newPassword !== "" ? newPassword : userLogin.user.password,
      };

      
      /* console.log(products);
        if(products){ */
          /* console.log(productsUser)
      }   */

      
      await updateUser(userLogin.user.id, updatedData);


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
          <img src={userLogin.user.image} alt="user" className="nav__userLogo" />
          <h2>Nombre: {userLogin.user.fullName}</h2>
          <h2>Email: {userLogin.user.email}</h2>
          <h2>Contraseña: {showPassword ? userLogin.user.password : "********"}</h2>
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          </button>
          <p>Deseas cambiar tu contraseña?</p>
        </div>
        <div className="Profile__buys">
  <h2>Mis Productos</h2>
  {productsUser && productsUser.map((product, index) => {
    const id = product.id;
    return (
      <ul>
      <Link key={index} to={`/product/detail/${id}`} >
        <li>
          {product.name}
        </li>
      </Link>
      </ul>
    );
  })}
</div>
        <div className="Profile__fields">
          <div>
            <h2>Cambiar contraseña</h2>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <button onClick={handleFieldChange}>Guardar contraseña</button>
          </div>
          <div>
            <h2>Cambiar nombre</h2>
            <input
              type="text"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
            />
            <button onClick={handleFieldChange}>Guardar nombre</button>
          </div>
          <div>
            <h2>Cambiar email</h2>
            <input
              type="text"
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
            />
            <button onClick={handleFieldChange}>Guardar email</button>
          </div>
          <div>
            <h2>Cambiar imagen</h2>
            <label htmlFor="image-upload" className="change_img_label">
              <span role="button" tabIndex={0}>
                📂
              </span>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={uploadImage}
              style={{ display: "none" }}
            />
            <button onClick={handleFieldChange}>Guardar imagen</button>
          </div>
        </div>
      </div>
    );
    
};

export default UserProfile;
