import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../utils/interfaces";


export interface ProductState {
	products: Product[];
	originalCopy: Product[];
  detail: Product
}

const initialState: ProductState = {
	products: [],
	originalCopy: [],
  detail: {
    id: 0,
    name: '',
    description: '',
    stock: 0,
    rating: 0.00,
    image: '',
    location: '',
    price: 0.00,
    categoryID: 0,
    nameCategory: '',
    userID: 0,
    userName: ''
  }
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		getProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload;
			state.originalCopy = action.payload;
		},
		filterProducts: (state, action: PayloadAction<string>) => {
			let productsFound: Product[] = [];
			action.payload === "All"
				? (productsFound = [...state.originalCopy])
				: action.payload === "Categorías"
				? (productsFound = state.originalCopy.filter(
						(match) => match.nameCategory === action.payload
				  ))
				: (productsFound = state.originalCopy.filter(
						(match) => match.userName === action.payload
				  ));

			state.products = productsFound;
		},
    orderProducts: (state, action: PayloadAction<string>) =>{
      const productsCopy = [...state.products];
      if(action.payload.length === 3) {
          action.payload === 'MAX' 
          ? productsCopy.sort((a, b)=> b.price - a.price)
          : productsCopy.sort((a, b)=> a.price - b.price)
      }
      else {
        action.payload === 'A' ?
        (productsCopy.sort((a, b) => {
          if(a.name < b.name) return -1
          if(a.name > b.name) return 1;
          return 0;
        }))
        : (productsCopy.sort((a, b) => {
          if(a.name > b.name) return -1
          if(a.name < b.name) return 1;
          return 0;
        }))
      }
      state.products = productsCopy;
      state.originalCopy = productsCopy;
    },
    getDetail:  (state, action: PayloadAction<Product>) =>{
      state.detail = action.payload
    }
	},
});

export const {getProducts, getDetail, filterProducts, orderProducts} = productSlice.actions;
export default productSlice.reducer;