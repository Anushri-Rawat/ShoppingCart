import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("shopVistaUser")
    ? JSON.parse(localStorage.getItem("shopVistaUser"))
    : null,
  isAuthenticated: localStorage.getItem("shopVistaUser") ? true : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("shopVistaUser", JSON.stringify(state.user));
    },
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("shopVistaUser");
    },
  },
});

export const { addUser, login, logout } = userSlice.actions;

export default userSlice.reducer;
