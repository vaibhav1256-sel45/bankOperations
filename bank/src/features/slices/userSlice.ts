import { createSlice} from '@reduxjs/toolkit';
import { fetchUsers } from '../UsersApi';
import type { userState } from '../../interfaces/userInterfaces';
const initialState: userState = {
  data:[] ,
  status:'',
  error:null
 };
const userSlice = createSlice({
  name: 'cash',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        // action.payload contains the value passed to rejectWithValue
        state.error = action.payload || action.error.message || 'Unknown error';
      });
  }
});

export default userSlice.reducer;
