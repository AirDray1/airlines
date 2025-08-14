import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flight } from '../types/flights';

interface FavoritesState {
  items: Flight[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Flight>) => {
      const exists = state.items.some(f => f.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(f => f.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(f => f.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.items = [];
    }
  },
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
