import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};
const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    changeLoadingState: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const selectLoading = (state) => state.loader;

export const { changeLoadingState } = loaderSlice.actions;

export default loaderSlice.reducer;
