import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/projects/projectSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
});
