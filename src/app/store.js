import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/userCart/cartSlice";
import authReducer from "../features/userAuth/authSlice";
import productReducer from "../features/products/productSlice";
import loaderReducer from "../features/customLoaders/loaderSlice";
import alertReducer from "../features/alert/alertSlice";

export const store = configureStore({
  reducer: {
    userCart: cartReducer,
    authUser: authReducer,
    allProducts: productReducer,
    loader: loaderReducer,
    alert: alertReducer,
  },
});
