import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../api/apis.js";

export const fetchSite = createAsyncThunk("fetchSite", async (url) => {
  return await getData(url);
});

const siteSlice = createSlice({
  name: "site",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSite.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSite.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchSite.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default siteSlice.reducer;
