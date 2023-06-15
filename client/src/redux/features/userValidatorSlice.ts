import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserValidatorState {
  value: boolean;
}

const initialState: UserValidatorState = {
  value: false,
};

const userValidatorSlice = createSlice({
  name: "userValidator",
  initialState,
  reducers: {
    setUserValidator: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setUserValidator } = userValidatorSlice.actions;
export default userValidatorSlice.reducer;
