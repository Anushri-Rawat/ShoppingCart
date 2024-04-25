import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { addUser, login, logout } = userSlice.actions;

export default userSlice.reducer;
