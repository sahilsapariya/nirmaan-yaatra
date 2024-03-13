import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseurl } from "../../config";
import { getData } from "../../api/apis";

export const fetchProjects = createAsyncThunk("fetchProjects", async () => {
  return await getData(`${baseurl}/api/v1/projects/`);
});

const projectSlice = createSlice({
  name: "project",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default projectSlice.reducer;
