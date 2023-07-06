import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { postUser } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/features/userSlice";
import { useState } from "react";
import { GoogleUser } from "../utils/interfaces";
import swal from 'sweetalert'


const GoogleRegister = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [error, setError] = useState<string>("");

	return (
		<>
			<GoogleLogin
				onSuccess={(credentialResponse) => {
					if (credentialResponse.credential) {
						const decoded: GoogleUser = jwt_decode(
							credentialResponse.credential
						);
						const userInfo = {
							fullName: decoded.name,
							password: decoded.sub,
							email: decoded.email,
							image: decoded.picture,
						};
						const logUser = async () => {
							try {
								const response = await postUser(userInfo);

								if (response.status === 201) {
									dispatch(addUser(response.data));
								}
								swal({
									title: "Registro exitoso",
									text: '🤖',
									icon: "sucess",
								});
								navigate("/login");
							} catch (error: any) {
								setError(error);
							}
						};
						logUser();
					}
				}}
				onError={() => {
					setError("No se pudo registrar el usuario");
				}}
			/>
			<p>{error ? error : ""}</p>
		</>
	);
};

export default GoogleRegister;
