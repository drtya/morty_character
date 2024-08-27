import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';
import {
  ICharacter,
  ITransformCharactersPage,
} from '@/types/character';
import {
  getCharacterById,
  getCharacterInPage,
} from '@/api/cahracter';
import { IResponse } from '@/api/fetchData';

export const getCharById = createAsyncThunk(
  'cahrakterById/fetchByIdStatus',
  async (charakterId: number, thunkAPI) => {
    const response: IResponse<ICharacter> = await getCharacterById(charakterId);
    return response;
  }
);

export const getAllChar = createAsyncThunk(
  'cahrakters/fetchByIdStatus',
  async (params: string, thunkAPI) => {
    const response: IResponse<ITransformCharactersPage> | undefined =
      await getCharacterInPage(params);
    return response;
  }
);

interface CounterState {
  currentCharacter: null |IResponse<ICharacter>;
  characters?: null | IResponse<ITransformCharactersPage>;
}

const initialState: CounterState = {
  currentCharacter: null,
  characters: null,
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getCharById.fulfilled, (state, action) => {
      state.currentCharacter = action.payload;
    });
    builder.addCase(getAllChar.fulfilled, (state, action) => {
      state.characters = action.payload;
    });
  },
});

export const {} = characterSlice.actions;

export const selectCharacter = (state: RootState) =>
  state.character.currentCharacter;

export default characterSlice.reducer;
