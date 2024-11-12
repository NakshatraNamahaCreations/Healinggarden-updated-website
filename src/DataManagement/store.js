import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Cartaction'; // This should be the file with createSlice

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
