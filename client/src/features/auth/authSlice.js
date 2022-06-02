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
  const responce = await axios.post(
    "https://medi-care2-0.vercel.app/api/login",
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }
  );
  console.log(responce.data);
  return responce.data;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const responce = await axios.post(
    "https://medi-care2-0.vercel.app/api/register",
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }
  );
  console.log(responce.data);
  return responce.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const responce = await axios.post(
    "https://medi-care2-0.vercel.app/api/logout",
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }
  );
  console.log(responce.data);
  return responce.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.cart = [];
      state.isAdmin = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
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

export const { setCart } = authSlice.actions;
export default authSlice.reducer;
export const getUser = (state) => state.auth.user;
export const getCart = (state) => state.auth.cart;
