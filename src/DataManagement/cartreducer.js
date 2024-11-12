const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case 'UPDATE_ITEM_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'REMOVE_ITEM_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item._id !== action.payload),
      };
    default:
      return state;
  }
};
