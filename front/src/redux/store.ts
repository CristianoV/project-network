import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user';
import friends from './slices/friends';
import groups from './slices/groups';
import profile from './slices/profile';

const store = configureStore({
  reducer: {
    user,
    friends,
    groups,
    profile,
  },
});

export default store;
