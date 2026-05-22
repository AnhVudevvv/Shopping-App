import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

store.subscribe(() => {
  const { cart, user } = store.getState();

  localStorage.setItem("cart", JSON.stringify(cart));

  if (user.user) {
    localStorage.setItem("user", JSON.stringify(user.user));
  } else {
    localStorage.removeItem("user");
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
