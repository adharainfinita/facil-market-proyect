import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../utils/interfaces";

interface CategoryState {
  value: Category[]
}

const initialState: CategoryState= {
  value: []
}

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories: (state, action: PayloadAction<Category[]>) => {
      state.value = action.payload
    }
  }
})

export const {getCategories} = categorySlice.actions;
export default categorySlice.reducer;