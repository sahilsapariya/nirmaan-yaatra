import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import projectReducer from '../features/projects/projectSlice';
import globalReducer from '../features/global/globalSlice';
import siteReducer from '../features/site/siteSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  project: projectReducer,
  global: globalReducer,
  site: siteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
