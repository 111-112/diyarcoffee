import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from "reselect";


const initialState = {
  value: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;

export const getCategory = createSelector(
    (state) => state.entities.category,
    (category) => category.value
  );