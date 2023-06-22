import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, UXDataLogin } from "../../utils/interfaces";

export interface UserState {
	userLogin: UserData;
	userValidation: boolean;
}

const initialState: UserState = {
	userLogin: {
		token: "",
		id: "",
		name: "",
		email: "",
		image:
			"https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
	},
	userValidation: false,
};

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		//* Acciones para traer usuarios y leerlos
		loggedUser: (state, action: PayloadAction<UserData>) => {
			state.userLogin = action.payload;
		},
		resetUsers: () => initialState, // Agregar esta acción para reiniciar el estado del usuario
		/* changeEmail: (state, action: PayloadAction<string>) => {
			state.userLogin.email = action.payload;
		}, */
		/* changePassword: (state, action: PayloadAction<string>) => {
			state.userLogin.password = action.payload;
		}, */
		/* changeImage: (state, action: PayloadAction<string>) => {
			state.userLogin.image = action.payload;
		}, */
		/* setUserValidator: (state, action: PayloadAction<boolean>) => {
			state.userValidation = action.payload;
		}, */
		setUserValidator: (state, action: PayloadAction<boolean>) => {
			state.userValidation = action.payload;
			if (!action.payload) {
				state.userLogin = initialState.userLogin;
			}
		},
		setLoggedInUserId: (state, action: PayloadAction<UXDataLogin>) => {
			state.userLogin.token = action.payload.token;
			state.userLogin.id = action.payload.id;
			state.userLogin.image = action.payload.image; // Actualiza el campo "id" en el estado userLogin
		},
	},
});

export const { loggedUser, resetUsers, setUserValidator, setLoggedInUserId } =
	userSlice.actions;
export default userSlice.reducer;
