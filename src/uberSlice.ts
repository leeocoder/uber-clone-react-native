import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface UberSate {
  origin: any;
  destination: any;
  travelTimeInformation: any;
}

const initialState: UberSate = {
  origin: 0,
  destination: 0,
  travelTimeInformation: 0,
};

const uberSlice = createSlice({
  name: 'uber',
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<any>) => {
      state.origin = action.payload;
    },
    setDestination: (state, action: PayloadAction<any>) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action: PayloadAction<number>) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } =
  uberSlice.actions;

export const selectOrigin = (state: RootState) => state.uber.origin;
export const selectDestination = (state: RootState) => state.uber.destination;
export const selectTravelTimeInformation = (state: RootState) =>
  state.uber.travelTimeInformation;

export default uberSlice.reducer;
