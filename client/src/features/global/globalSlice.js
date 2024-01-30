import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    trigger: false,
  },
  reducers: {
    onTape: (state) => {
      state.trigger = !state.trigger;
    }
  }
});

export const { onTape } = globalSlice.actions;

export default globalSlice.reducer;
