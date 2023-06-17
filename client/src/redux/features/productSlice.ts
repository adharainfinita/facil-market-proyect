  import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
  import { Product } from "../../utils/interfaces";
  import axios from "axios";
  import { RootState } from '../store';

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
      categoryName: '',
      userID: 0,
      userName: ''
    }
  };

  export const getAllProducts = createAsyncThunk('products/getAllProducts', 
    async () => {
      try {
        const response = await axios("http://localhost:3001/product");
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        throw new Error(error.message);
      }
  });

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
    filterProducts: (state, action: PayloadAction<string>) => {
      const selectedLocation = action.payload;
      let productsFound: Product[] = [];
    
      if (selectedLocation === "All") {
        productsFound = [...state.originalCopy];
      } else {
        productsFound = state.originalCopy.filter((product) => product.location === selectedLocation);
      }
    
      state.products = productsFound;
    },

    filterByLocation: (state, action: PayloadAction<string>) => {
      const selectedLocation = action.payload;
      let filteredProducts: Product[];

      if (selectedLocation === "All") {
        filteredProducts = [...state.originalCopy];
      } else {
        filteredProducts = state.originalCopy.filter((product) => product.location === selectedLocation);
      }

      state.products = filteredProducts;
    },
    
    orderProducts: (state, action: PayloadAction<string>) => {
      const orderDirection = action.payload;
      const productsCopy = [...state.products];
    
      if (orderDirection === 'MAX') {
        productsCopy.sort((a, b) => b.price - a.price);
      } else if (orderDirection === 'MIN') {
        productsCopy.sort((a, b) => a.price - b.price);
      }
    
      state.products = productsCopy;
    },
    
    getDetail:  (state, action: PayloadAction<Product>) =>{
      state.detail = action.payload
    },
    cleanDetail: (state, action: PayloadAction<Product>) =>{
      state.detail = action.payload
    }
	},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {     
      state.products = action.payload;
      state.originalCopy = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.products = [];
      console.log(action);
    });
  },
});

export const {getProducts, getDetail, filterProducts, orderProducts, cleanDetail, getSearchedProducts, filterByLocation} = productSlice.actions;
export default productSlice.reducer;
export const selectSearchedProducts = (state: RootState) => state.product.products;