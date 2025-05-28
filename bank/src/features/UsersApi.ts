import { createAsyncThunk } from '@reduxjs/toolkit';
import type { userData } from '../interfaces/userInterfaces';

export const fetchUsers = createAsyncThunk<
  userData[], 
  void,  
  { rejectValue: string }
>(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://67e37dcd2ae442db76d04eaa.mockapi.io/users');
      if (!response.ok) {
       
        return rejectWithValue('Failed to fetch posts!');
      }
      return await response.json();
    } catch (err) {
      return rejectWithValue('Network error!');
    }
  }
);
