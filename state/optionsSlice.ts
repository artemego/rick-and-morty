import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';

const options = createSlice({
  name: 'options',
  initialState: {
    page: 1,
    scrollY: 0,
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
    setPage: (state, action) => {
      return {
        ...state,
        page: action.payload,
      };
    },
    setScrollY: (state, action) => {
      return {
        ...state,
        scrollY: action.payload,
      };
    },
  },
});

export const selectPage = (state: AppState) => state.options.page;
export const selectScrollY = (state: AppState) => state.options.scrollY;

export const { nextPage, prevPage, setScrollY, setPage } = options.actions;

export default options.reducer;
