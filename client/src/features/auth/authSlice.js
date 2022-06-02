import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isAdmin: false,
  cart: [],
};

export const login = createAsyncThunk("auth/login", async (data) => {
  const responce = await axios.post("/api/auth/login", data);

  console.log(responce.data);
  return responce.data.user;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const responce = await axios.post("/api/auth/register", data);

  console.log(responce.data);
  return responce.data.user;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      console.log(state.user);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      if (state.user.isAdmin) {
        state.isAdmin = true;
      }
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { setCart, logout } = authSlice.actions;
export default authSlice.reducer;
export const getUser = (state) => state.auth.user;
export const getCart = (state) => state.auth.cart;
export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
