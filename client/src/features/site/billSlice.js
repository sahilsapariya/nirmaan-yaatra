import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../api/apis";
import { baseurl } from "../../config";

export const fetchBill = createAsyncThunk("fetchBill", async (url) => {
  return await getData(`${baseurl}/api/v1/bills/`);
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
