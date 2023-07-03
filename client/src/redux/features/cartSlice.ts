import { BuyProduct, Cart } from "../../utils/interfaces";
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
		addToCart: (state, action: PayloadAction<BuyProduct>) => {
			state.cartItems.products = [...state.cartItems.products, action.payload];

			alert("Producto agregado al carrito");
			// state.totalPrice = calculateTotalPrice(state.cartItems.products).toString();
		},

		decrementQuantity: (state, action: PayloadAction<number>) => {
			state.cartItems.products = state.cartItems.products.map((product) => {
				if (product.id === action.payload && product.quantity > 1) {
					return {
						...product,
						quantity: product.quantity - 1,
					};
				}
				return product;
			});
		},
		incrementQuantity: (state, action: PayloadAction<number>) => {
			state.cartItems.products = state.cartItems.products.map((product) => {
				if (product.id === action.payload) {
					return {
						...product,
						quantity: product.quantity + 1,
					};
				}
				return product;
			});
		},

		removeFromCart: (state, action: PayloadAction<number>) => {
			const productIdToRemove = action.payload;

			state.cartItems.products = state.cartItems.products.filter(
				(item) => item.id !== productIdToRemove
			);

			// state.totalPrice = calculateTotalPrice(state.cartItems.products).toString()
		},
		clearCart: (state) => {
			state.cartItems.products = [];
			// state.totalPrice = 0;
		},
	},
});

export const {
	addToCart,
	clearCart,
	removeFromCart,
	startCart,
	incrementQuantity,
	decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;