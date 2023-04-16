import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFromApi } from '../../utils/axios';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (token: string, thunkAPI) => {
    const [userResponse, groupsResponse, friendsResponse] = await Promise.all([
      await fetchFromApi.get('/user', {
        headers: {
          authorization: token,
        },
      }),
      fetchFromApi.get('/partner', {
        headers: {
          authorization: token,
        },
      }),
      fetchFromApi.get('/friends', {
        headers: {
          authorization: token,
        },
      }),
    ]);
    return {
      info: userResponse.data,
      groups: groupsResponse.data,
      friends: friendsResponse.data,
    };
  }
);

interface UsersState {
  info: [];
  friends: [];
  groups: [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  info: [],
  friends: [],
  groups: [],
  loading: 'idle',
} as UsersState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.info = action.payload.info;
      state.groups = action.payload.groups;
      state.friends = action.payload.friends;
      state.loading = 'succeeded';
    }),
      builder.addCase(fetchUserData.pending, (state, action) => {
        state.loading = 'pending';
      }),
      builder.addCase(fetchUserData.rejected, (state, action) => {
        state.loading = 'failed';
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
