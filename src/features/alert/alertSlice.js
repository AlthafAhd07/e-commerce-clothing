import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast: {
    visible: false,
    msg: "",
    type: "",
    time: 1500,
  },
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast = { ...state.toast, ...action.payload };
    },
  },
});

export const selectAlert = (state) => state.alert;

export const { showToast } = alertSlice.actions;

export default alertSlice.reducer;
