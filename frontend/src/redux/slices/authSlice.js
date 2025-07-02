import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    }
  },
});

export const { login, logout, updateProfile } = authSlice.actions;

// Async thunk to update backend + Redux
export const updateUserProfile = (userId, data) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/users/profile/${userId}`, data);
    dispatch(login(res.data)); // or use updateProfile(res.data)
  } catch (err) {
    console.error("Failed to update profile:", err);
  }
};

export default authSlice.reducer;
