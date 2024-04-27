import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity:
    JSON.parse(localStorage.getItem("cartItems"))?.reduce(
      (acc, i) => acc + i.itemQuantity,
      0
    ) || 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIdx = state.cartItems.findIndex(
        (item) => item.id == action.payload.id
      );
      if (existingItemIdx >= 0) {
        state.cartItems[existingItemIdx] = {
          ...state.cartItems[existingItemIdx],
          itemQuantity:
            state.cartItems[existingItemIdx].itemQuantity +
            action.payload.itemQuantity,
        };
        //toast.success("Product quantity increased in cart");
      } else {
        state.cartItems.push(action.payload);
        toast.success("Product added to cart");
      }
      state.cartTotalQuantity += action.payload.itemQuantity;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCartItemQty(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].itemQuantity > 1) {
        state.cartItems[itemIndex].itemQuantity -= 1;
      } else if (state.cartItems[itemIndex].itemQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart");
      }
      state.cartTotalQuantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const existingItemIdx = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIdx >= 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        toast.error("Product removed from cart");
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        state.cartTotalQuantity -= action.payload.itemQuantity;
      }
    },
    clearCart: (state, actions) => {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotal: (state, action) => {
      const { total, qty } = state.cartItems.reduce(
        (acc, item) => {
          acc.total += item.price * item.itemQuantity;
          acc.qty += item.itemQuantity;
          return acc;
        },
        { total: 0, qty: 0 }
      );
      state.cartTotalAmount = total;
      state.cartTotalQuantity = qty;
    },
  },
});

export const {
  addToCart,
  clearCart,
  removeFromCart,
  decreaseCartItemQty,
  getTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
