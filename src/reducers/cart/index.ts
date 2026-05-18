import type { CartAction, CartState } from "../../types/cart.type";

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const { product, userId } = action.payload;

      const existingItem = state.cartItems.find(
        item => item.id === product.id && item.userId === userId
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map(item =>
            item.id === product.id && item.userId === userId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cartItems: [
          ...state.cartItems,
          {
            ...product,
            quantity: 1,
            userId,
          },
        ],
      };
    }

    case "REMOVE_PRODUCT": {
      const { productId, userId } = action.payload;

      return {
        cartItems: state.cartItems.filter(
          item => !(item.id === productId && item.userId === userId)
        ),
      };
    }

    case "INCREASE_QUANTITY": {
      const { productId, userId } = action.payload;

      return {
        cartItems: state.cartItems.map(item =>
          item.id === productId && item.userId === userId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case "DECREASE_QUANTITY": {
      const { productId, userId } = action.payload;

      return {
        cartItems: state.cartItems
          .map(item =>
            item.id === productId && item.userId === userId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0),
      };
    }

    case "CLEAR_CART": {
      const { userId } = action.payload;

      return {
        cartItems: state.cartItems.filter(item => item.userId !== userId),
      };
    }

    default:
      return state;
  }
};