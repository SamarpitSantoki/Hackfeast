import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  products: [],
  filteredProducts: [],
  searchValue: "",
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    console.log("fetching products");
    const responce = await axios.get(
      `https://${window.location.hostname}:1338/api/products/search?search=`
    );
    console.log(responce.data);
    return responce.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },

    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { setFilteredProducts, setSearchValue, setProducts } =
  productSlice.actions;
export default productSlice.reducer;
export const getProducts = (state) => state.products.products;
export const getFilteredProducts = (state) => state.products.filteredProducts;
export const getSearchValue = (state) => state.products.searchValue;
