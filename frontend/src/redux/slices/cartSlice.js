import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // ✅ Consistent naming
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Match by id AND size if applicable
      const existingItem = state.items.find(
        (x) => x.id === item.id && x.size === item.size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        (x) => !(x.id === id && x.size === size)
      );
    },

    clearCart: (state) => {
      state.items = [];
    },

    increaseQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find(
        (x) => x.id === id && x.size === size
      );
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find(
        (x) => x.id === id && x.size === size
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (x) => !(x.id === id && x.size === size)
        );
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
