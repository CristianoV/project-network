import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFromApi } from '../../utils/axios';

export const fetchFriendsById = createAsyncThunk(
  'friends/fetchByIdStatus',
  async (token: string, thunkAPI) => {
    const response = await fetchFromApi.get('/friends', {
      headers: {
        authorization: token,
      },
    });

    return response.data;
  }
);

interface UsersState {
  info: [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  info: [],
  loading: 'idle',
} as UsersState;

export const userSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFriendsById.fulfilled, (state, action) => {
      state.info = action.payload;
      state.loading = 'succeeded';
    }),
      builder.addCase(fetchFriendsById.pending, (state, action) => {
        state.loading = 'pending';
      }),
      builder.addCase(fetchFriendsById.rejected, (state, action) => {
        state.loading = 'failed';
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
