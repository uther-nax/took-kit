import { configureStore } from '@reduxjs/toolkit';
import toastStateReducer from './ToastSlice';

const store = configureStore({
  reducer: {
    toastState: toastStateReducer,
  },
});

export default store;
