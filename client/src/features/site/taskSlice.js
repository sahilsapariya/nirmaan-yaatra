import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../api/apis";
import { baseurl } from "../../config";

export const fetchTask = createAsyncThunk("fetchTask", async () => {
  return await getData(`${baseurl}/api/v1/tasks/`);
});

const taskSlice = createSlice({
  name: "bill",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTask.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default taskSlice.reducer;
