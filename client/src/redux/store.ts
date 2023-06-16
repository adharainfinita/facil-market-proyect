import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/getUserSlice";
import productSlice from "./features/productSlice";
import categorySlice from "./features/categorySlice";
import userValidatorReducer from "../redux/features/userValidatorSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		product: productSlice,
		category: categorySlice,
    userValidator: userValidatorReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
//*Le das la capacidad de hacer dispatch en cualquier lugar,
//* usando el useDispatch de toda la vida.

export type RootState = ReturnType<typeof store.getState>;
//*La usarás para definir el tipo de "state" cuando uses useSelector.