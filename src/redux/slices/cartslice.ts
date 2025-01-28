import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}
interface CartState {
  cart: CartItem[];
}

// Initial state
const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        // -----Item already in the cart, increase quantity
        state.cart[existingItemIndex].quantity++;
      } else {
        //----------New item, add to the cart with quantity 1
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<number | string>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<number | string>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number | string>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
