import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFromApi } from '../../utils/axios';

export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (token: string, thunkAPI) => {
    const response = await fetchFromApi.get('/user', {
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
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.info = { ...action.payload };
      state.loading = 'succeeded';
    }),
      builder.addCase(fetchUserById.pending, (state, action) => {
        state.loading = 'pending';
      }),
      builder.addCase(fetchUserById.rejected, (state, action) => {
        state.loading = 'failed';
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;

/*
export default usersSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setFirstName, setEmail } = userSlice.actions;
export default userSlice.reducer;
*/
