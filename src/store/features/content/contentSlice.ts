import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export enum ContentTypes {
  LiveTracking = 'LiveTracking',
  Reports = 'Reports',
}

// Define a type for the slice state
interface ContentState {
  activeTab?: ContentTypes;
  activeTrain?: string;
}

// Define the initial state using that type
const initialState: ContentState = {
  activeTab: undefined,
  activeTrain: undefined,
};

export const contentSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<ContentTypes | undefined>) => {
      state.activeTab = action.payload;
      state.activeTrain = undefined;
    },
    setActiveTrain: (state, action: PayloadAction<string | undefined>) => {
      state.activeTab = ContentTypes.LiveTracking;
      state.activeTrain = action.payload;
    },
  },
});

export const { setActiveTab, setActiveTrain } = contentSlice.actions;

export const selectActiveTab = (state: RootState) => state.content.activeTab;
export const selectActiveTrain = (state: RootState) => state.content.activeTrain;

export default contentSlice.reducer;
