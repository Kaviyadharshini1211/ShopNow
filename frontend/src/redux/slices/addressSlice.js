// redux/slices/addressSlice.js
import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: [],
    selected: null,
  },
  reducers: {
    addAddress: (state, action) => {
      state.list.push(action.payload);
    },
    selectAddress: (state, action) => {
      state.selected = action.payload;
    },
    updateAddress: (state, action) => {
      const index = state.list.findIndex(addr => addr.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteAddress: (state, action) => {
      state.list = state.list.filter(addr => addr.id !== action.payload);
      if (state.selected === action.payload) state.selected = null;
    },
  },
});

export const { addAddress, selectAddress, updateAddress, deleteAddress } = addressSlice.actions;
export default addressSlice.reducer;
