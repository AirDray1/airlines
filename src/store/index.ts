import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { setCart } from './cartSlice';
import favoritesReducer from './favouritesSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart.tickets));
});

const saved = localStorage.getItem('cart');
if (saved) {
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      store.dispatch(setCart(parsed));
    }
  } catch {
    console.warn('Помилка парсингу localStorage');
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
