// src/redux/slices/ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: []  // each order: { id, date, total, items }
  },
  reducers: {
    addOrder(state, action) {
      state.list.push(action.payload);
    }
  }
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
