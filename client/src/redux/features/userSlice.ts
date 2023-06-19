import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserData, UXDataLogin } from "../../utils/interfaces";

export interface UserState {
	users: User[];
	userLogin: UserData;
	userValidation: boolean;
}

const initialState: UserState = {
	users: [],
	userLogin: {
		name: "",
		email: "",
		password: "",
		id: "",
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
		getUsers: (state, action: PayloadAction<User[]>) => {
			state.users = action.payload;
		},
		addUser: (state, action: PayloadAction<UserData>) => {
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
			state.userLogin.id = action.payload.id;
			state.userLogin.image = action.payload.image; // Actualiza el campo "id" en el estado userLogin
		},
	},
});

export const {
	getUsers,
	addUser,
	resetUsers,
	setUserValidator,
	setLoggedInUserId,
} = userSlice.actions;
export default userSlice.reducer;
