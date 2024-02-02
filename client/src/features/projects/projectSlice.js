import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../../hooks/CustomHooks";
import { baseurl } from "../../config";

export const fetchProjects = createAsyncThunk("fetchProjects", async () => {
  return await fetchData(`${baseurl}/api/v1/projects/`);
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
