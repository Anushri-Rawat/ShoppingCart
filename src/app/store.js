import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: { user: userReducer, product: productReducer, cart: cartReducer },
});
