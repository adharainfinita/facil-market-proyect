import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/interfaces";


export interface UserState {
  value: User[]
}

const initialState: UserState = {
  value: []
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //* Acciones para traer usuarios y leerlos
    getUsers: (state, action: PayloadAction<User[]>) => {
     state.value = action.payload
    },
    // getUserDetail:(state, action: PayloadAction<number>) => {

    //   state.value = action.payload
    //  },
    // resetUser: () => initialState, // Agregar esta acción para reiniciar el estado del usuario
    
    //* Acciones para modificar la información de un usuario en particular
    // changeEmail: (state, action: PayloadAction<string>) => {
    //   state.email = action.payload;
    // },
    // changePassword: (state, action: PayloadAction<string>) => {
    //   state.password = action.payload;
    // },
    // changeImage: (state, action: PayloadAction<string>) => {
    //   state.image = action.payload;
    // },
  },
});


export const { getUsers} = userSlice.actions;
export default userSlice.reducer;