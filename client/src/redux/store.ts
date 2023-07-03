import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import productSlice from "./features/productSlice";
import categorySlice from "./features/categorySlice";
import adminSlice from "./features/adminSlice";
import cartSlice from "./features/cartSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		product: productSlice,
		category: categorySlice,
		admin: adminSlice,
		cart: cartSlice
	},
});

export type AppDispatch = typeof store.dispatch;
//*Le das la capacidad de hacer dispatch en cualquier lugar,
//* usando el useDispatch de toda la vida.

export type RootState = ReturnType<typeof store.getState>;
//*La usarás para definir el tipo de "state" cuando uses useSelector.
