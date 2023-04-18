import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user';
import profile from './slices/profile';

const store = configureStore({
  reducer: {
    user,
    profile,
  },
});

export default store;
