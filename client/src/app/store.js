import { combineReducers, configureStore } from '@reduxjs/toolkit';
import projectReducer from '../features/projects/projectSlice';
import globalReducer from '../features/global/globalSlice';
import siteReducer from '../features/site/siteSlice';
import billReducer from '../features/site/billSlice';

const rootReducer = combineReducers({
  project: projectReducer,
  global: globalReducer,
  site: siteReducer,
  bill: billReducer
});

export const store = configureStore({
  reducer: rootReducer,
});
