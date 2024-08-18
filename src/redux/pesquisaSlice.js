import {createSlice} from '@reduxjs/toolkit';

const initialValues = {
  id: null,
  nome: null,
  data: null,
  imageUrl: null,
};

export const pesquisaSlice = createSlice({
  name: 'pesquisa',
  initialState: initialValues,
  reducers: {
    reducerSetPesquisa: (state, action) => {
      state.id = action.payload.id;
      state.nome = action.payload.nome;
      state.data = action.payload.data;
      state.imageUrl = action.payload.imageUrl;
    },
  },
});

export const {reducerSetPesquisa} = pesquisaSlice.actions;

export default pesquisaSlice.reducer;
