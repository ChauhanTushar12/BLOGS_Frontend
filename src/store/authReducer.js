import { createSlice } from "@reduxjs/toolkit";

// Check if token exists in localStorage
const token = localStorage.getItem("accessToken");
const isAdminStored = localStorage.getItem("isAdmin") === "true"; // Optional if you store admin flag

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!token,
    isAdmin: !!token && isAdminStored,
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      state.isAdmin = false;
      localStorage.setItem("isAdmin", "false");
    },
    adminlogin: (state) => {
      state.isLoggedIn = true;
      state.isAdmin = true;
      localStorage.setItem("isAdmin", "true");
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isAdmin");
    },
    setAuth: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isAdmin = action.payload.isAdmin || false;
      localStorage.setItem("isAdmin", action.payload.isAdmin ? "true" : "false");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
