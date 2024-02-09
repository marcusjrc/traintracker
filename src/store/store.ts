import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mapReducer from './features/map/mapSlice';
import contentReducer from './features/content/contentSlice';

export const rootReducer = combineReducers({
  map: mapReducer,
  content: contentReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
