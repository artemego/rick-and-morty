import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICharacter, IInfo } from '../common/types';
import { getItemsApi } from '../pages/api/items';
import { AppState } from './store';

export const getItems = createAsyncThunk(
  'table/getItems',
  async (page?: number) => {
    const data = await getItemsApi(page);
    return data;
  }
);

const table = createSlice({
  name: 'table',
  initialState: {
    loading: false,
    error: null,
    chars: [] as ICharacter[],
    info: {} as IInfo,
  },
  reducers: {},
  extraReducers: {
    [getItems.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      // console.log(payload);
      // set new info
      state.info = payload.info;
      // set new characters
      state.chars = payload.results;
    },
    [getItems.pending.type]: (state) => {
      // console.log('getting items');
      state.loading = true;
    },
  },
});

// selectors
export const selectChars = (state: AppState) => state.table.chars;
export const selectInfo = (state: AppState) => state.table.info;

export default table.reducer;
