import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface CounterState {
  search: string;
  genderFilter: string;
  statusFilter: string;
}

const initialState: CounterState = {
  search: '',
  genderFilter: '',
  statusFilter: '',
};

export const paramsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    setGender: (state, actions: PayloadAction<string>) => {
      state.genderFilter = actions.payload;
    },
    setStatus: (state, actions: PayloadAction<string>) => {
      state.statusFilter = actions.payload;
    },
    setSearch: (state, actions: PayloadAction<string>) => {
      state.search = actions.payload;
    },
  },
});

export const {setGender,setStatus,setSearch} = paramsSlice.actions;

export const selectCharacter = (state: RootState) =>
  state.params;

export default paramsSlice.reducer;
