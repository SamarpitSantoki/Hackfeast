import { RootState } from "../store";

const state: RootState = {
  admin: {
    products: [],
    users: [],
    orders: [],
    categories: [],
    isLoading: false,
    error: null,
  },
  auth: {
    isAuthenticated: false,
    user: null,
    error: null,
    isAdmin: true,
    cart: [],
  },
  posts: {
    posts: [],
    status: "idle",
    error: null,
  },
  products: {
    products: [],
    filteredProducts: [],
    searchValue: "",
    status: "idle",
    error: null,
  },
};

export const testUseAppSelector = (f) => f(state);
