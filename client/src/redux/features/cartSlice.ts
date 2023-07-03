import { Cart } from "../../utils/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const cartItemsFromStorage = localStorage.getItem("cartItems");

interface CartState {
  cartItems: Cart;
  // totalPrice: number | null;
}

const initialState: CartState = {
  cartItems: {
    id: 0,
    userID: 0,
    products: [],
  },
  // totalPrice: 0,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    startCart: (state, action: PayloadAction<Cart>) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action: PayloadAction<number>) => {
      if (!state.cartItems.products.includes(action.payload)) {
        state.cartItems.products = [...state.cartItems.products, action.payload]
      }
      alert("Producto agregado al carrito")
      // state.totalPrice = calculateTotalPrice(state.cartItems.products).toString();
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productIdToRemove = action.payload;

      state.cartItems.products = state.cartItems.products.filter((item) => item !== productIdToRemove)

      // state.totalPrice = calculateTotalPrice(state.cartItems.products).toString()
    },
    clearCart: (state) => {
      state.cartItems.products = [];
      // state.totalPrice = 0;
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
