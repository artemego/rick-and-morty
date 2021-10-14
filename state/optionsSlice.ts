import { createSlice } from '@reduxjs/toolkit';
import { Params } from '../common/types';
import { AppState } from './store';

const options = createSlice({
  name: 'options',
  initialState: {
    page: 1,
    scrollY: 0,
    searchCol: Params.name as Params,
    searchText: '' as string,
    isSearchOpen: false as boolean,
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
    setSearchCol: (state, action) => {
      return {
        ...state,
        searchCol: action.payload,
      };
    },
    setSearchText: (state, action) => {
      return {
        ...state,
        searchText: action.payload,
      };
    },
    setIsSearchOpen: (state, action) => {
      return {
        ...state,
        isSearchOpen: action.payload,
      };
    },
  },
});

export const selectPage = (state: AppState) => state.options.page;
export const selectScrollY = (state: AppState) => state.options.scrollY;
export const selectSearchCol = (state: AppState) => state.options.searchCol;
export const selectSearchText = (state: AppState) => state.options.searchText;
export const selectIsSearchOpen = (state: AppState) =>
  state.options.isSearchOpen;

export const {
  nextPage,
  prevPage,
  setScrollY,
  setPage,
  setSearchCol,
  setSearchText,
  setIsSearchOpen,
} = options.actions;

export default options.reducer;
