// store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ticket {
  flightId: string;
  seat: string;
  price: number;
}

interface CartState {
  tickets: Ticket[];
}

const initialState: CartState = {
  tickets: [], // ✅ має бути масив
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
    },
    removeTicket: (state, action: PayloadAction<{ flightId: string; seat: string }>) => {
      state.tickets = state.tickets.filter(
        t => !(t.flightId === action.payload.flightId && t.seat === action.payload.seat)
      );
    },
    setCart: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
  },
});

export const { addTicket, removeTicket, setCart } = cartSlice.actions;
export default cartSlice.reducer;
