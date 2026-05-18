import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { cartReducer } from "../../reducers/cart";
import type { Product } from "../../types/product.type";
import { CartContext } from "./cartContext";
import type { CartState } from "../../types/cart.type";
import { useUser } from "../../hooks/useUser";

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

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, getInitialCartState);
  const { user } = useUser();
  const userid = user?.userid;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addProduct = useCallback(
    (product: Product) => {
      if (!userid) return;

      dispatch({
        type: "ADD_PRODUCT",
        payload: {
          product,
          userId: userid,
        },
      });
    },
    [userid]
  );

  const removeProduct = useCallback(
    (productId: number) => {
      if (!userid) return;

      dispatch({
        type: "REMOVE_PRODUCT",
        payload: {
          productId,
          userId: userid,
        },
      });
    },
    [userid]
  );

  const increaseQuantity = useCallback(
    (productId: number) => {
      if (!userid) return;

      dispatch({
        type: "INCREASE_QUANTITY",
        payload: {
          productId,
          userId: userid,
        },
      });
    },
    [userid]
  );

  const decreaseQuantity = useCallback(
    (productId: number) => {
      if (!userid) return;

      dispatch({
        type: "DECREASE_QUANTITY",
        payload: {
          productId,
          userId: userid,
        },
      });
    },
    [userid]
  );

  const clearCart = useCallback(() => {
    if (!userid) return;

    dispatch({
      type: "CLEAR_CART",
      payload: {
        userId: userid,
      },
    });
  }, [userid]);

  const currentUserCartItems = useMemo(
    () =>
      userid
        ? state.cartItems.filter((item) => item.userId === userid)
        : [],
    [state.cartItems, userid]
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

  const value = useMemo(
    () => ({
      cartItems: state.cartItems,
      currentUserCartItems,
      addProduct,
      removeProduct,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      totalQuantity,
      totalPrice,
    }),
    [
      addProduct,
      clearCart,
      decreaseQuantity,
      increaseQuantity,
      removeProduct,
      currentUserCartItems,
      state.cartItems,
      totalPrice,
      totalQuantity,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
