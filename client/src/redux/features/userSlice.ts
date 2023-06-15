import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  lastName: "",
  email: "",
  password: "",
  image: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    resetUser: () => initialState, // Agregar esta acción para reiniciar el estado del usuario
    changeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    changePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    changeImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
  },
});

export type { UserState };
export const { addUser, resetUser, changeEmail, changePassword, changeImage } =
  userSlice.actions;
export default userSlice.reducer;