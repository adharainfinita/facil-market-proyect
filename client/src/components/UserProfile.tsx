import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateUser } from "../services/userServices";
import {
	changeEmail,
	changePassword,
	changeName,
	changeImage,
} from "../redux/features/userSlice";
import { user } from "../utils/interfaces";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsBagCheck } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import swal from "sweetalert";

const UserProfile: React.FC = () => {
	const dispatch = useDispatch();
	const [showFields, setShowFields] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [newName, setNewName] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [newImage, setNewImage] = useState("");
	const [isPasswordChanged, setIsPasswordChanged] = useState(false);

	const userLogin = useSelector((state: RootState) => state.user.userLogin);

	const handleFieldChange = async (): Promise<void> => {
		try {
			const updatedData: user = {
				fullName: newName !== "" ? newName : userLogin.user.fullName,
				email: newEmail !== "" ? newEmail : userLogin.user.email,
				id: userLogin.user.id,
				image: newImage !== "" ? newImage : userLogin.user.image,
				password: newPassword !== "" ? newPassword : userLogin.user.password,
			};

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

			setNewPassword("");
			setNewName("");
			setNewEmail("");
			setShowFields(false);
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
					swal("Error al subir la imagen", `${error}`, "error");
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (newImage !== "") {
			dispatch(changeImage(newImage));
			swal("Imagen actualizada!", "🤳", "success");
		}
	}, [newImage, dispatch]);

	useEffect(() => {
		if (isPasswordChanged) {
			swal("Contraseña actualizada exitosamente", "🕵️", "success");
		}
	}, [isPasswordChanged]);

	return (
		<div className="Center">
			<div className="Profile__conteiner">
				<div className="Profile__data">
					<div>
						{showFields && (
							<label htmlFor="image-upload" className="change_img_label">
								<span role="button" tabIndex={0}>
									<BsPencilFill className="user__pencil" />
								</span>
								<div>
									<input
										id="image-upload"
										type="file"
										accept="image/*"
										onChange={uploadImage}
										style={{ display: "none" }}
									/>
								</div>
							</label>
						)}
						<img
							src={userLogin.user.image}
							alt="user"
							className="nav__userLogo"
						></img>
					</div>
					<h2 className="user__name">Nombre: {userLogin.user.fullName}</h2>
					<h2 className="user__email">Email: {userLogin.user.email}</h2>
					<div className="Profile__myProducts">
						<h4>
							<BsBagCheck className="icon" />
							<Link to="/ventas">Mis Productos</Link>
						</h4>
					</div>

					<button onClick={() => setShowFields(!showFields)}>
						{showFields ? "Cancelar" : "⚙ Editar campos"}
					</button>
					{showFields && (
						<div className="Profile__fields">
							<div>
								<h2>Cambiar contraseña</h2>
								<input
									type="password"
									value={newPassword}
									placeholder="Ingresa Tu Nueva Contraseña"
									onChange={(event) => setNewPassword(event.target.value)}
								/>
							</div>
							<div>
								<h2>Cambiar nombre</h2>
								<input
									type="text"
									placeholder="Ingresa Tu Nuevo Nombre"
									value={newName}
									onChange={(event) => setNewName(event.target.value)}
								/>
							</div>
							<div>
								<h2>Cambiar email</h2>
								<input
									type="text"
									placeholder="Ingresa Tu Nuevo Email"
									value={newEmail}
									onChange={(event) => setNewEmail(event.target.value)}
								/>
							</div>
							<button className="profile__save" onClick={handleFieldChange}>
								Guardar cambios
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
