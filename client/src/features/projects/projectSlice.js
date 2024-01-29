import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk("fetchProjects", async (url, { getState }) => {
  const { project } = getState();

  // Check if data is already available in the store
  if (project.data) {
    console.log("returing store data");
    return project.data; // Return existing data
  }
  console.log("make request");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("authTokens")).access
      }`,
    },
  });

  return response.json();
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
