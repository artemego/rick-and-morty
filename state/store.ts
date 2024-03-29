import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import tableReducer from './tableSlice';
import optionsReducer from './optionsSlice';

export function makeStore() {
  return configureStore({
    reducer: { table: tableReducer, options: optionsReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
