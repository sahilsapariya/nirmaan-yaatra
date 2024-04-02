import { combineReducers, configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/projects/projectSlice";
import globalReducer from "../features/global/globalSlice";
import siteReducer from "../features/site/siteSlice";
import billReducer from "../features/site/billSlice";
import taskReducer from "../features/site/taskSlice";

// Action creator for clearing all state
export const clearState = () => ({
  type: "CLEAR_STATE",
});

// Define a root reducer that listens for CLEAR_STATE
const appReducer = combineReducers({
  project: projectReducer,
  global: globalReducer,
  site: siteReducer,
  bill: billReducer,
  task: taskReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "CLEAR_STATE") {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
