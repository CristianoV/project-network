import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFromApi } from '../../utils/axios';

export const fetchProfileUserData = createAsyncThunk(
  'profile/fetchUserData',
  async (id: string, thunkAPI) => {
    const [userResponse, groupsResponse, friendsResponse] = await Promise.all([
      fetchFromApi.get(`/user/${id}`),
      fetchFromApi.get(`/partner/${id}`),
      fetchFromApi.get(`/friends/${id}`),
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
  name: 'profile',
  initialState,
  reducers: {
    cleanUserData: (state) => {
      state.info = [];
      state.groups = [];
      state.friends = [];
      state.loading = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileUserData.fulfilled, (state, action) => {
      state.info = action.payload.info;
      state.groups = action.payload.groups;
      state.friends = action.payload.friends;
      state.loading = 'succeeded';
    }),
      builder.addCase(fetchProfileUserData.pending, (state, action) => {
        state.loading = 'pending';
      }),
      builder.addCase(fetchProfileUserData.rejected, (state, action) => {
        state.loading = 'failed';
      });
  },
});

export const { cleanUserData } = userSlice.actions;
export default userSlice.reducer;
