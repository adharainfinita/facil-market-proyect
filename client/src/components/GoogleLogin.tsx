import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { logUser } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedUser } from "../redux/features/userSlice";
import { useState } from "react";
import { GoogleUser } from "../utils/interfaces";

const GoogleAuth = () => {
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
						console.log(decoded);

						const userInfo = {
							email: decoded.email,
							password: decoded.sub,
						};

						const LogUser = async () => {
							try {
								const response = await logUser(userInfo);
								const token = response.token;
								window.localStorage.setItem("token", token);

								if (response) {
									dispatch(loggedUser(response));
									navigate("/");
								}
							} catch (error) {
								setError(`${error}`);
								console.error(error);
							}
						};
						LogUser();
					}
				}}
				onError={() => {
					setError("Ingreso no permitido");
				}}
			/>
			<p>{error ? error : ""}</p>
		</>
	);
};

export default GoogleAuth;
