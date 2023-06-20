import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, FiltersCaché } from "../../utils/interfaces";
import axios from "axios";
/* import { RootState } from "../store"; */

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
    image: "",
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
    getProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.originalCopy = action.payload;
    },
    getSearchedProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    filterProductsByCategory: (state, action: PayloadAction<string>) => {
      const categoryName = action.payload;
      let productsFound: Product[] = [];

      if (categoryName === "All") {
        productsFound = [...state.originalCopy];
      } else {
        productsFound = state.originalCopy.filter(
          (product) => product.categoryName === categoryName
        );
      }

      state.products = productsFound;
      state.requireFilters.categoryName = categoryName;
    },
    filterProductsByLocation: (state, action: PayloadAction<string>) => {
      let productsFound: Product[] = [...state.originalCopy];
			state.requireFilters.location = action.payload;

			if (action.payload === "All") state.requireFilters.location = "";
			else {
				productsFound = state.originalCopy.filter(
					(match) => match.location === action.payload
				);
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
			}
			state.products = productsFound;
		},
    resetFilters: (state, _action: PayloadAction<void>) => {
      state.products = state.originalCopy;
      state.requireFilters.categoryName = "";
      state.requireFilters.location = "";
    },
    orderProducts: (state, action: PayloadAction<string>) => {
      const orderBy = action.payload;
      let productsCopy = [...state.products];

      switch (orderBy) {
        case "MAX":
          productsCopy.sort((a, b) => b.price - a.price);
          break;
        case "MIN":
          productsCopy.sort((a, b) => a.price - b.price);
          break;

        case "A":
          productsCopy.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "D":
          productsCopy.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }

      state.products = productsCopy;
    },
    getDetail: (state, action: PayloadAction<Product>) => {
      state.detail = action.payload;
    },
    cleanDetail: (state, _action: PayloadAction<void>) => {
      state.detail = initialState.detail;
    },
  },
});

export const {
  getProducts,
  getDetail,
  filterProductsByCategory,
  filterProductsByLocation,
  orderProducts,
  cleanDetail,
  getSearchedProducts,
  resetFilters,
} = productSlice.actions;

/* export const selectSearchedProducts = (state: RootState) =>
  state.product.products; */

export default productSlice.reducer;
