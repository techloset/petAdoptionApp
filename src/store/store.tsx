import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import dataReducer from './slices/dataSlice';
import favouriteReducer from './slices/favouriteSlice';
import credentialReducer from './slices/credentialSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    data:dataReducer,
    favourite:favouriteReducer,
    credential: credentialReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;


