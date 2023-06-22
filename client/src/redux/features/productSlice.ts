import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, FiltersCaché } from "../../utils/interfaces";
import axios from "axios";
import { RootState } from "../store";
//import { URL_API } from "../../utils/URLS";

export interface ProductState {
  products: Product[];
  originalCopy: Product[];
  detail: Product;
  requireFilters: FiltersCaché;
}

const initialState: ProductState = {
  products: [],
  originalCopy: [],
  detail: {
    id: 0,
    name: "",
    description: "",
    stock: 0,
    rating: 0.0,
    image: [""],
    location: "",
    price: 0.0,
    categoryID: 0,
    categoryName: "",
    userID: 0,
    userName: "",
  },
  requireFilters: {
    userName: "",
    categoryName: "",
    location: "",
  },
};
///
export const getAllProducts = async () => {
  try {
    const { data } = await axios(`http://localhost:3001/product`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		getSearchedProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload;
		},
		getProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = action.payload;
			state.originalCopy = action.payload;
		},
	
		filterProductsByCategory: (state, action: PayloadAction<string>) => {
			let productsFound: Product[] = [...state.originalCopy];
			state.requireFilters.categoryName = action.payload;
			
			if (action.payload === "All") state.requireFilters.categoryName = "";
			else {
				productsFound = state.originalCopy.filter(
						(match) => 
						match.categoryName === action.payload)
						}
						if(state.requireFilters.userName){
					productsFound= productsFound.filter(match => match.userName === state.requireFilters.userName)	
						}
						if(state.requireFilters.location){
						productsFound=	productsFound.filter(match =>match.location === state.requireFilters.location)
						}

			
			state.products = productsFound;
		},
		filterProductsByUser: (state, action: PayloadAction<string>) => {
			let productsFound: Product[] = [...state.originalCopy];
			state.requireFilters.userName = action.payload;
			if (action.payload === "All") state.requireFilters.userName = "";
			else {
				productsFound = state.originalCopy.filter(
					(match) => match.userName === action.payload
				);}
				if (state.requireFilters.categoryName) {
					productsFound = productsFound.filter(
						(match) => match.categoryName === state.requireFilters.categoryName
					);
				}
				if (state.requireFilters.location) {
					productsFound = productsFound.filter(
						(match) => match.location === state.requireFilters.location
					);
				}
		
			
			state.products = productsFound;
		},

		filterProductsByLocation: (state, action: PayloadAction<string>) => {
			let productsFound: Product[] = [...state.originalCopy];
			state.requireFilters.location = action.payload;
			if (action.payload === "All") {
				state.requireFilters.location = "";
				
			}
			else {
				productsFound = state.originalCopy.filter(
					(match) => match.location === action.payload
				);}
				if (state.requireFilters.categoryName) {
					productsFound = productsFound.filter(
						(match) => match.categoryName === state.requireFilters.categoryName
					);
				}
				if (state.requireFilters.userName) {
					productsFound = productsFound.filter(
						(match) => match.userName === state.requireFilters.userName
					);
				}
			
			
			state.products = productsFound;
		},
		resetFilters: (state, _action: PayloadAction<void>) => {
			state.requireFilters = initialState.requireFilters;
			state.products = state.originalCopy;
		},
		orderProducts: (state, action: PayloadAction<string>) => {
			const productsCopy = [...state.products];
			state.requireFilters.location = action.payload;
			if (action.payload.length === 3) {
				action.payload === "MAX"
					? productsCopy.sort((a, b) => b.price - a.price)
					: productsCopy.sort((a, b) => a.price - b.price);
			} else {
				action.payload === "A"
					? productsCopy.sort((a, b) => {
							if (a.name < b.name) return -1;
							if (a.name > b.name) return 1;
							return 0;
					  })
					: productsCopy.sort((a, b) => {
							if (a.name > b.name) return -1;
							if (a.name < b.name) return 1;
							return 0;
					  });
			}
			state.products = productsCopy;
			state.originalCopy = productsCopy;
		},
		getDetail: (state, action: PayloadAction<Product>) => {
			state.detail = action.payload;
		},
		cleanDetail: (state, action: PayloadAction<Product>) => {
			state.detail = action.payload;
		},
	},
	/* extraReducers: (builder) => {
		builder.addCase(getAllProducts.fulfilled, (state, action) => {
			state.products = action.payload;
			state.originalCopy = action.payload;
		});
		builder.addCase(getAllProducts.rejected, (state, action) => {
			state.products = [];
			console.log(action);
		});
	}, */
});

export const {
  getProducts,
  getDetail,
  filterProductsByCategory,
  filterProductsByUser,
  filterProductsByLocation,
  orderProducts,
  cleanDetail,
  getSearchedProducts,
  resetFilters,
} = productSlice.actions;
export default productSlice.reducer;
export const selectSearchedProducts = (state: RootState) =>
  state.product.products;