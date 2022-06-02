import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/posts/postSlice";
import productReducer from "./features/product/productSlice";
import authReducer from "./features/auth/authSlice";
export default configureStore({
  reducer: {
    products: productReducer,
    posts: postsReducer,
    auth: authReducer,
  },
});
