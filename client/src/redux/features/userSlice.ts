import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, UXDataLogin, User, isLogin } from "../../utils/interfaces";

export interface UserState {
  users: User[];
  userLogin: UserData;
  userValidation: boolean;
}

const initialState: UserState = {
  users: [],
  userLogin: {
    token: "",
    user: {
      id: "",
      fullName: "",
      email: "",
      image:
        "https://static.thenounproject.com/png/5034901-200.png",
      admin: false,
    },
  },
  userValidation: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //* Acciones para traer usuarios y leerlos
    getUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    loggedUser: (state, action: PayloadAction<UserData>) => {
      state.userLogin = action.payload;
    },
    resetUsers: () => initialState, // Agregar esta acción para reiniciar el estado del usuario
    changeEmail: (state, action: PayloadAction<string>) => {
      state.userLogin.user.email = action.payload;
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.userLogin.user.fullName = action.payload;
    },
    changePassword: (state, action: PayloadAction<string>) => {
      state.userLogin.user.password = action.payload;
    },
    changeImage: (state, action: PayloadAction<string>) => {
      state.userLogin.user.image = action.payload;
    },
    setUserValidator: (state, action: PayloadAction<boolean>) => {
      state.userValidation = action.payload;
      if (!action.payload) {
        state.userLogin = initialState.userLogin;
      }
    },
    setLoggedInUserId: (state, action: PayloadAction<UXDataLogin>) => {
      state.userLogin.token = action.payload.token;
      state.userLogin.user.id = action.payload.id;
      state.userLogin.user.image = action.payload.image; // Actualiza el campo "id" en el estado userLogin
    },
    userLogin: (state, action: PayloadAction<isLogin>) => {
      state.userLogin.user = action.payload;
    },
  },
});

export const {
  getUsers,
  changePassword,
  changeEmail,
  changeName,
  changeImage,
  loggedUser,
  resetUsers,
  setUserValidator,
  setLoggedInUserId,
  userLogin,
} = userSlice.actions;
export default userSlice.reducer;
