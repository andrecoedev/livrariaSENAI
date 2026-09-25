import { legacy_createStore as createStore } from 'redux';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

export const initialState = {
  cart: [],
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.payload;
      if (!product || product.id == null) return state;

      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case UPDATE_QUANTITY: {
      const { id, quantity } = action.payload ?? {};
      if (!Number.isInteger(quantity) || quantity < 0) return state;

      return {
        ...state,
        cart: quantity === 0
          ? state.cart.filter((item) => item.id !== id)
          : state.cart.map((item) =>
              item.id === id ? { ...item, quantity } : item,
            ),
      };
    }

    default:
      return state;
  }
}

const store = createStore(cartReducer);

export default store;
