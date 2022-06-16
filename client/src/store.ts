import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/posts/postSlice";
import productReducer from "./features/product/productSlice";
import authReducer from "./features/auth/authSlice";
import adminReducer from "./features/admin/adminSlice";
import { useDispatch } from "react-redux";
const store = configureStore({
  reducer: {
    products: productReducer,
    posts: postsReducer,
    auth: authReducer,
    admin: adminReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
