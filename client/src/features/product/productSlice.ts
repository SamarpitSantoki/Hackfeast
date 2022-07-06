import {
  createSlice,
  createAsyncThunk,
  Reducer,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ActionsFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import axios from "axios";
import { RootState } from "../../store";

export interface ProductState {
  products: Object[];
  filteredProducts: Object[];
  searchValue: String;
  status: String;
  error: any;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  searchValue: "",
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<String>(
  "products/fetchProducts",
  async () => {
    console.log("fetching products");
    const responce = await axios.get(
      `http://${window.location.hostname}:1338/api/products/search?search=`
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
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products = action.payload;
        state.filteredProducts = action.payload;
        state.error = null;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { setFilteredProducts, setSearchValue, setProducts } =
  productSlice.actions;
// export default productSlice.reducer;
export const getProducts = (state) => state.products.products;
export const getFilteredProducts = (state) => state.products.filteredProducts;
export const getSearchValue = (state) => state.products.searchValue;

export default productSlice.reducer as Reducer<typeof initialState>;
