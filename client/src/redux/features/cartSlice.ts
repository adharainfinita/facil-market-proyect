import { Cart, Product } from "../../utils/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState{
  cartItems: Cart,
  totalPrice: string | null;
}

const initialState: CartState = {
  cartItems: {
    id: 0,
    userID: 0,
    products:[]
  },
  totalPrice: localStorage.getItem("totalPrice"),
};

const calculateTotalPrice = (cartItems: any[]) => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    startCart: (state, action:PayloadAction<Cart>) =>{
      state.cartItems = action.payload;
 
    },
    addToCart: (state, action:PayloadAction<Array<Product>>) => {

    },
    removeFromCart: (state, action:PayloadAction<number>) =>{

    }
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
