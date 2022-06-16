import {
  createSlice,
  createAsyncThunk,
  Reducer,
  AsyncThunkPayloadCreator,
} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  isAdmin: true,
  cart: [],
};

// create interface for the state
export interface AuthState {
  isAuthenticated: boolean;
  user: Object;
  error: any;
  isAdmin: boolean;
  cart: any[];
}

const localData = sessionStorage.getItem("user");
if (localData) {
  const parsedData = JSON.parse(localData);
  initialState.user = parsedData;
  initialState.isAuthenticated = true;
  const cart = sessionStorage.getItem("cart");
  if (cart) {
    initialState.cart = JSON.parse(cart);
  }
}
export const login = createAsyncThunk<string, Object>(
  "auth/login",
  async (data) => {
    const responce = await axios.post(
      `http://${window.location.hostname}:1338/api/auth/login`,
      data
    );

    console.log(responce.data);
    return responce.data.user;
  },
  null
);

export const register = createAsyncThunk<string, Object>(
  "auth/register",
  async (data: Object) => {
    console.log(data);
    const responce = await axios.post(
      `http://${window.location.hostname}:1338/api/auth/register`,
      data
    );

    console.log(responce.data);
    return responce.data.user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      sessionStorage.removeItem("user");
    },
    addToCart: (state, action) => {
      console.log(action.payload);
      let cart = state.cart;
      let prod = action.payload.slug;
      if (cart.length > 0) {
        let cartItems = [...cart];
        if (cartItems.find((e) => e.slug == prod)) {
          cartItems.map((e) => {
            if (e.slug === prod) e.quntity++;
          });
        } else {
          cartItems.push({
            ...action.payload,
            quntity: 1,
          });
        }
        let product = [...cartItems];
        state.cart = product;
        sessionStorage.setItem("cart", JSON.stringify(product));
      } else {
        state.cart = [{ ...action.payload, quntity: 1 }];
        sessionStorage.setItem("cart", JSON.stringify(cart));
      }
    },
    clearCart: (state) => {
      state.cart = [];
      sessionStorage.removeItem("cart");
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

export const { clearCart, logout, addToCart } = authSlice.actions;
// export default authSlice.reducer;
export const getUser = (state) => state.auth.user;
export const getCart = (state) => state.auth.cart;
export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getIsAdmin = (state) => state.auth.isAdmin;
export default authSlice.reducer as Reducer<typeof initialState>;
