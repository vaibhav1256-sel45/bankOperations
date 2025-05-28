import { configureStore } from '@reduxjs/toolkit';
import cashReducer from './slices/cashSlice';
import userReducer from './slices/userSlice';
export const store = configureStore({
  reducer: {
    cash: cashReducer,
    user:userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
