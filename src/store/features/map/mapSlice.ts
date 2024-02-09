import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { Map } from 'mapbox-gl';

// Define a type for the slice state
interface MapState {
  instance?: Map;
}

// Define the initial state using that type
const initialState: MapState = {
  instance: undefined,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapInstance: (state, action: PayloadAction<Map>) => {
      state.instance = action.payload;
    },
  },
});

export const { setMapInstance } = mapSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMapInstance = (state: RootState) => state.map.instance;

export default mapSlice.reducer;
