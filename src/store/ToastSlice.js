import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toastState',
  initialState: {
    isShow: false,
    content: '',
  },
  reducers: {
    show(state, action) {
      state.content = action.payload.content;
      state.isShow = true;
    },
    hide(state) {
      state.content = '';
      state.isShow = false;
    },
  },
});

export const { show, hide } = toastSlice.actions;
export default toastSlice.reducer;
