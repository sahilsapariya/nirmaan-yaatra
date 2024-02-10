import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../../hooks/CustomHooks";

export const fetchBill = createAsyncThunk("fetchBill", async (url) => {
  return await fetchData(url);
});

const billSlice = createSlice({
  name: "bill",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBill.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBill.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBill.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default billSlice.reducer;
