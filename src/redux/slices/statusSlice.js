import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { produce } from "immer";

const initialState = {
  value: "",
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatus: (state, action) =>
      produce(state, (draft) => {
        draft.value = action.payload.status;
      }),
  },
});

export const { setStatus } = statusSlice.actions;

export const getStatus = createSelector(
  (state) => state.entities.status.value,
  (status) => status.value
);

export default statusSlice.reducer;
