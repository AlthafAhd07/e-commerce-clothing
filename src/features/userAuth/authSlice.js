import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
};
const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    login: {
      reducer: (state, action) => {
        state.user = action.payload;
      },
      prepare: (uid, displayName, email) => {
        return {
          payload: {
            uid,
            displayName,
            email,
          },
        };
      },
    },
    logout: (state) => {
      state.user = "";
    },
  },
});

export const selectAuth = (state) => state.authUser;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
