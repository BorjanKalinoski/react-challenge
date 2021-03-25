import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../archive/counter/counterSlice';
import authReducer from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
