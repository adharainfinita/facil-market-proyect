import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { logUser } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedUser } from "../redux/features/userSlice";
import { useState } from "react";
import { GoogleUser } from "../utils/interfaces";
import {toast, ToastContainer} from 'react-toastify'


interface GoogleLoginProps {
  updateMessage: (newMessage: string) => void;
}

const GoogleAuth = ({ updateMessage }: GoogleLoginProps) => {
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
              email: decoded.email,
              password: decoded.sub,
            };

            const LogUser = async () => {
              try {
                const response = await logUser(userInfo);
                if (response.user.active === false) {
                  updateMessage("Tu cuenta ha sido desactivada");
                  return;
                }
                const token = response.token;
                window.localStorage.setItem("token", token);

                if (response) {
                  dispatch(loggedUser(response));
                  toast.success('Sesión iniciada!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
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
				<ToastContainer/>
<<<<<<< HEAD

=======
>>>>>>> 41acff5952d6e24e95a625dcb1a3f108511f5dcf
      <p>{error ? error : ""}</p>
    </>
  );
};

export default GoogleAuth;
