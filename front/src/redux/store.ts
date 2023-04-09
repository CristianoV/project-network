import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user';
import friends from './slices/friends';
import groups from './slices/groups';

const store = configureStore({
  reducer: {
    user,
    friends,
    groups,
  },
});

export default store;
