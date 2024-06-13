import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productCount: 0,
};

export const cartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.unshift({
        product: action.payload.product,
        count: action.payload.count,
      });
      state.productCount += 1;
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.product.id !== action.payload
      );
      state.productCount -= 1;
    },
    addMultipleToCart: (state, action) => {
      state.products = action.payload;
      state.productCount = action.payload.length;
    },
    clearCart: (state) => {
      state = {
        products: [],
        productCount: 0,
      };
    },
    updateProductCount: (state, action) => {
      state.products = state.products.map((item) => {
        if (item.product.id === action.payload.id) {
          return {
            ...item,
            count: action.payload.count,
          };
        } else {
          return item;
        }
      });
    },
  },
});

export const {
  addToCart,
  addMultipleToCart,
  clearCart,
  removeFromCart,
  updateProductCount,
} = cartSlice.actions;

export const selectCart = (state) => state.userCart;

export default cartSlice.reducer;
