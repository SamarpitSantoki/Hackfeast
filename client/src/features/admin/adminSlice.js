import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  users: [],
  orders: [],
  categories: [],
  isLoading: false,
  error: null,
};

export const getProducts = createAsyncThunk(
  "admin/getProducts",
  async (data) => {
    const responce = await axios.get(
      `https://${window.location.hostname}:1338/api/admin/products`
    );
    return responce.data.products;
  }
);

export const getUsers = createAsyncThunk("admin/getUsers", async (data) => {
  const responce = await axios.get(
    `https://${window.location.hostname}:1338/api/admin/users`
  );
  return responce.data.users;
});

export const getOrders = createAsyncThunk("admin/getOrders", async (data) => {
  const responce = await axios.get(
    `https://${window.location.hostname}:1338/api/admin/orders`
  );
  return responce.data;
});

export const getCategories = createAsyncThunk(
  "admin/getCategories",
  async (data) => {
    const responce = await axios.get(
      `https://${window.location.hostname}:1338/api/products/categories`
    );
    return responce.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// export const { addProduct, editProduct } = adminSlice.actions;
export default adminSlice.reducer;
export const selectProducts = (state) => state.admin.products;
export const selectUsers = (state) => state.admin.users;
export const selectOrders = (state) => state.admin.orders;
export const selectCategories = (state) => state.admin.categories;
export const selectIsLoading = (state) => state.admin.isLoading;
export const selectError = (state) => state.admin.error;
