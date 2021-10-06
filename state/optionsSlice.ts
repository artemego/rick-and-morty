import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';

const options = createSlice({
  name: 'options',
  initialState: {
    page: 1,
  },
  reducers: {
    nextPage: (state) => {
      return {
        ...state,
        page: state.page + 1,
      };
    },
    prevPage: (state) => {
      return {
        ...state,
        page: state.page - 1,
      };
    },
  },
});

export const selectPage = (state: AppState) => state.options.page;

export const { nextPage, prevPage } = options.actions;

export default options.reducer;
