import type { Product } from "./product.type";

export interface CartItem extends Product {
  quantity: number;
  userId: number;
}

export interface CartState {
  cartItems: CartItem[];
}

export type CartAction =
  | {
      type: "ADD_PRODUCT";
      payload: {
        product: Product;
        userId: number;
      };
    }
  | {
      type: "REMOVE_PRODUCT";
      payload: {
        productId: number;
        userId: number;
      };
    }
  | {
      type: "INCREASE_QUANTITY";
      payload: {
        productId: number;
        userId: number;
      };
    }
  | {
      type: "DECREASE_QUANTITY";
      payload: {
        productId: number;
        userId: number;
      };
    }
  | {
      type: "CLEAR_CART";
      payload: {
        userId: number;
      };
    };

export interface CartContextType {
  cartItems: CartItem[];
  currentUserCartItems: CartItem[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalPrice: number;
}
