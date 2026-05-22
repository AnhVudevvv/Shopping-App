import { useCallback, useMemo } from "react";
import {
  addProduct as addProductAction,
  clearCart as clearCartAction,
  decreaseQuantity as decreaseQuantityAction,
  increaseQuantity as increaseQuantityAction,
  removeProduct as removeProductAction,
} from "../store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";
import type { Product } from "../types/product.type";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const userId = useAppSelector((state) => state.user.user?.userid);

  const addProduct = useCallback(
    (product: Product) => {
      if (!userId) return;

      dispatch(addProductAction({ product, userId }));
    },
    [dispatch, userId]
  );

  const removeProduct = useCallback(
    (productId: number) => {
      if (!userId) return;

      dispatch(removeProductAction({ productId, userId }));
    },
    [dispatch, userId]
  );

  const increaseQuantity = useCallback(
    (productId: number) => {
      if (!userId) return;

      dispatch(increaseQuantityAction({ productId, userId }));
    },
    [dispatch, userId]
  );

  const decreaseQuantity = useCallback(
    (productId: number) => {
      if (!userId) return;

      dispatch(decreaseQuantityAction({ productId, userId }));
    },
    [dispatch, userId]
  );

  const clearCart = useCallback(() => {
    if (!userId) return;

    dispatch(clearCartAction({ userId }));
  }, [dispatch, userId]);

  const currentUserCartItems = useMemo(
    () => (userId ? cartItems.filter((item) => item.userId === userId) : []),
    [cartItems, userId]
  );

  const totalQuantity = useMemo(
    () => currentUserCartItems.reduce((total, item) => total + item.quantity, 0),
    [currentUserCartItems]
  );

  const totalPrice = useMemo(
    () =>
      currentUserCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [currentUserCartItems]
  );

  return {
    cartItems,
    currentUserCartItems,
    addProduct,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalQuantity,
    totalPrice,
  };
};
