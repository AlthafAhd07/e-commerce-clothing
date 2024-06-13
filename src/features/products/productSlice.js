import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  men: [],
  women: [],
};
const productSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
    },
    getMenProducts: (state, action) => {
      state.men = action.payload;
    },
    getWomenProducts: (state, action) => {
      state.women = action.payload;
    },
  },
});

export const selectProducts = (state) => state.allProducts;

export const { getAllProducts, getMenProducts, getWomenProducts } =
  productSlice.actions;

export default productSlice.reducer;
