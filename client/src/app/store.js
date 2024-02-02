import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/projects/projectSlice";
import globalReducer from "../features/global/globalSlice"
import siteReducer from "../features/site/siteSlice"

export const store = configureStore({
  reducer: {
    project: projectReducer,
    global: globalReducer,
    site: siteReducer
  },
});
