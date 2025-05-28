import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CashState } from '../../interfaces/cashInterfaces';

const initialState: CashState = { count: 0 };
const cashSlice = createSlice({
  name: 'cash',
  initialState,
  reducers: {
    incrementBy: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    decrementBy: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
    },
  },

});

export const { incrementBy, decrementBy } = cashSlice.actions;
export default cashSlice.reducer;
