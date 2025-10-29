import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import ordersReducer from "./slices/ordersSlice";
import wishlistReducer from './slices/wishlistSlice';
import addressReducer from './slices/addressSlice'; // ✅ Add this



const store = configureStore({
  reducer: {
        

    products: productReducer,
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
    wishlist: wishlistReducer,
    address: addressReducer, // ✅ Register reducer here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
