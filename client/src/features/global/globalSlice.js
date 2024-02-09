import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    sitePopupTrigger: false,
    contractorPopupTrigger: true,
    isAdmin: false
  },
  reducers: {
    onSiteTape: (state) => {
      state.sitePopupTrigger = !state.sitePopupTrigger;
    },
    onContractorTape: (state) => {
      state.contractorPopupTrigger = !state.contractorPopupTrigger
    },
    onIsAdminChange: (state, action) => {
      state.isAdmin = action.payload;
    }
  }
});

export const { onSiteTape, onContractorTape, onIsAdminChange } = globalSlice.actions;

export default globalSlice.reducer;
