import { createSlice } from '@reduxjs/toolkit';

const loadCartItemsFromLocalStorage = () => {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
};

const initialState = {
  cartItems: loadCartItemsFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const { uniqueId, ...itemData } = action.payload;
      const existingItem = state.cartItems.find(item => item.uniqueId === uniqueId);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.cartItems.push({ ...itemData, uniqueId, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateItemQuantity(state, action) {
      const { uniqueId, quantity } = action.payload;
      const item = state.cartItems.find(item => item.uniqueId === uniqueId);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    removeItemFromCart(state, action) {
      const index = action.payload;
      state.cartItems.splice(index, 1); // Remove item at the specified index
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const { addItemToCart, updateItemQuantity, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
