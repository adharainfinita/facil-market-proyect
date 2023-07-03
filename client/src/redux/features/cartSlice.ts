import { Product } from "../../utils/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem("cartItems");
const initialState: any = {
  cartItems: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [],
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
    addToCart(state, action: PayloadAction<Product>) {
      const existingIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
      } else {
        const tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        window.alert("Producto agregado");
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.totalPrice = calculateTotalPrice(state.cartItems);
      localStorage.setItem("totalPrice", state.totalPrice.toString());
    },
    removeFromCart(state, action: PayloadAction<Product>) {
      state.cartItems.map((cartItem: any) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item: any) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;
          alert("Producto eliminado del carrito");
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          state.totalPrice = calculateTotalPrice(state.cartItems);
          localStorage.setItem("totalPrice", state.totalPrice.toString());
          return state;
        }
      });
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      alert("Se limpio el carrito");
      state.totalPrice = 0;
      localStorage.setItem("totalPrice", state.totalPrice.toString());
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
