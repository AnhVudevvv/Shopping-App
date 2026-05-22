import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "../../types/cart.type";
import type { Product } from "../../types/product.type";

const initialCartState: CartState = {
  cartItems: [],
};

const getInitialCartState = (): CartState => {
  const savedCart = localStorage.getItem("cart");

  if (!savedCart) return initialCartState;

  try {
    return JSON.parse(savedCart) as CartState;
  } catch {
    localStorage.removeItem("cart");
    return initialCartState;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialCartState(),
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{ product: Product; userId: number }>
    ) => {
      const { product, userId } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id && item.userId === userId
      );

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.cartItems.push({
        ...product,
        quantity: 1,
        userId,
      });
    },
    removeProduct: (
      state,
      action: PayloadAction<{ productId: number; userId: number }>
    ) => {
      const { productId, userId } = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => !(item.id === productId && item.userId === userId)
      );
    },
    increaseQuantity: (
      state,
      action: PayloadAction<{ productId: number; userId: number }>
    ) => {
      const { productId, userId } = action.payload;
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === productId && cartItem.userId === userId
      );

      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<{ productId: number; userId: number }>
    ) => {
      const { productId, userId } = action.payload;
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === productId && cartItem.userId === userId
      );

      if (!item) return;

      item.quantity -= 1;

      if (item.quantity <= 0) {
        state.cartItems = state.cartItems.filter(
          (cartItem) =>
            !(cartItem.id === productId && cartItem.userId === userId)
        );
      }
    },
    clearCart: (state, action: PayloadAction<{ userId: number }>) => {
      const { userId } = action.payload;

      state.cartItems = state.cartItems.filter((item) => item.userId !== userId);
    },
  },
});

export const {
  addProduct,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
