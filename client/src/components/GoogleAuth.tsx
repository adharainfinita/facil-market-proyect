import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { logUser, postUser } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedUser } from "../redux/features/userSlice";
import { useState } from "react";
import { GoogleUser } from "../utils/interfaces";
import { toast, ToastContainer } from "react-toastify";
import { RootState } from "../redux/store";

interface GoogleLoginProps {
  updateMessage?: (newMessage: string) => void | undefined;
}

const GoogleAuth = ({ updateMessage }: GoogleLoginProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");
  const user = useSelector((state: RootState) => state.user.users);

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

            const userInfoRegister = {
              fullName: decoded.name,
              password: decoded.sub,
              email: decoded.email,
              image: decoded.picture,
            };

            const LogUser = async () => {
              try {
                // Register
                const existingUser = user.find(
                  (u) => u.email === userInfoRegister.email
                );

                if (!existingUser) {
                  const response = await postUser(userInfoRegister);

                  if (response.status === 201) {
                    dispatch(loggedUser(response));
                  }
                  const res = await logUser(userInfo);

                  if (res.user.active === false) {
                    if (updateMessage) {
                      updateMessage("Tu cuenta ha sido desactivada");
                    }
                    return;
                  }
                  const token = res.token;
                  window.localStorage.setItem("token", token);
                  if (res) {
                    dispatch(loggedUser(res));
                    toast.success("Registro exitoso", {
                      position: "bottom-left",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                    navigate("/");
                    return;
                  }
                }
                // Login
                // let userFound = false;
                for (let i = 0; i < user.length; i++) {
                  if (user[i].email === userInfo.email) {
                    // userFound = true;
                    const response = await logUser(userInfo);
                    if (response.user.active === false) {
                      if (updateMessage) {
                        updateMessage("Tu cuenta ha sido desactivada");
                      }
                      return;
                    }
                    const token = response.token;
                    window.localStorage.setItem("token", token);

                    if (response) {
                      dispatch(loggedUser(response));
                      toast.success("Sesión iniciada!", {
                        position: "bottom-left",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                      });
                      navigate("/");
                    }
                    break;
                  }
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
      <ToastContainer />
      <p>{error ? error : ""}</p>
    </>
  );
};

export default GoogleAuth;
