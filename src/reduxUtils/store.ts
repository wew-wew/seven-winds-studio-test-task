import { configureStore } from '@reduxjs/toolkit';
import rowsReducer from '../features/dashboard/redux/reducer';

export const store = configureStore({
  reducer: {
    rows: rowsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
