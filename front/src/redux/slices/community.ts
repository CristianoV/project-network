import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFromApi } from '../../utils/axios';

export const fetchProfileUserData = createAsyncThunk(
  'community/fetchUserData',
  async (id: string, thunkAPI) => {
    const [userResponse, groupsResponse] = await Promise.all([
      fetchFromApi.get(`/groups/${id}`),
      fetchFromApi.get(`/partner/group/${id}`),
    ]);

    return {
      info: userResponse.data,
      members: groupsResponse.data,
    };
  }
);

interface UsersState {
  info: [];
  members: [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  info: [],
  members: [],
  loading: 'idle',
} as UsersState;

export const userSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    cleanUserData: (state) => {
      state.info = [];
      state.members = [];
      state.loading = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileUserData.fulfilled, (state, action) => {
      state.info = action.payload.info;
      state.members = action.payload.members;
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
