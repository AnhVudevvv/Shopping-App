import { createContext } from "react";
import type { CartContextType } from "../../types/cart.type";

export const CartContext = createContext<CartContextType | null>(null);