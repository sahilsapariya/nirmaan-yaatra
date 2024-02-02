import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    sitePopupTrigger: false,
    contractorPopupTrigger: true
  },
  reducers: {
    onSiteTape: (state) => {
      state.sitePopupTrigger = !state.sitePopupTrigger;
    },
    onContractorTape: (state) => {
      state.contractorPopupTrigger = !state.contractorPopupTrigger
    }
  }
});

export const { onSiteTape, onContractorTape } = globalSlice.actions;

export default globalSlice.reducer;
