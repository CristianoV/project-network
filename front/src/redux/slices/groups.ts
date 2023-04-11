import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFromApi } from '../../utils/axios';

export const fetchGroupsById = createAsyncThunk(
  'groups/fetchByIdStatus',
  async (token: string, thunkAPI) => {
    const response = await fetchFromApi.get('/partner', {
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
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGroupsById.fulfilled, (state, action) => {
      state.info = action.payload;
      state.loading = 'succeeded';
    }),
      builder.addCase(fetchGroupsById.pending, (state, action) => {
        state.loading = 'pending';
      }),
      builder.addCase(fetchGroupsById.rejected, (state, action) => {
        state.loading = 'failed';
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
