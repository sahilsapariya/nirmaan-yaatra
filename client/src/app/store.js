import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/projects/projectSlice";
import globalReducer from "../features/global/globalSlice"

export const store = configureStore({
  reducer: {
    project: projectReducer,
    global: globalReducer
  },
});
