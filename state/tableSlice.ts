import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICharacter, IInfo, IItems, IParams } from '../common/types';
import { getItemsApi } from '../pages/api/items';
import { AppState } from './store';

export const getItems = createAsyncThunk(
  'table/getItems',
  async ({
    page,
    params,
  }: {
    page?: number;
    params?: IParams;
  }): Promise<IItems> => {
    const data = await getItemsApi(page, params);
    // кажется, мне надо здесь выкидывать ошибку
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
      console.log('in fulfilled');
      state.loading = false;
      // set new info if info changed
      if (
        state.info.count !== payload.info.count ||
        state.info.pages !== payload.info.pages
      ) {
        state.info = payload.info;
      }

      // set new characters
      state.chars = payload.results;
    },
    [getItems.rejected.type]: (state, { payload }) => {
      console.log('in rejected');
      state.loading = false;
      // set blank info and items from api
      state.info = { pages: 0, count: 0 };
      state.chars = [];
    },
    [getItems.pending.type]: (state) => {
      state.loading = true;
    },
  },
});

// selectors
export const selectChars = (state: AppState) => state.table.chars;
export const selectInfo = (state: AppState) => state.table.info;

export default table.reducer;
