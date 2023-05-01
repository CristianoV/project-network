import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user';
import profile from './slices/profile';
import community from './slices/community';

const store = configureStore({
  reducer: {
    user,
    profile,
    community,
  },
});

export default store;
