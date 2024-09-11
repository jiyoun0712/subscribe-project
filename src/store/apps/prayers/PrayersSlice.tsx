import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import type { PayloadAction } from '@reduxjs/toolkit';

const API_URL = '/api/data/prayers/PrayersData';

interface StateType {
  prayers: any[];
  prayersContent: number;
  prayerSearch: string;

}

const initialState = {
  prayers: [],
  prayersContent: 0,
  prayerSearch: '',

};

export const PrayersSlice = createSlice({
  name: 'prayers',
  initialState,
  reducers: {
    getPrayers: (state, action) => {
      state.prayers = action.payload;
    },
    SearchPrayers: (state, action) => {
      state.prayerSearch = action.payload;
    },
    SelectPrayer: (state, action) => {
      state.prayersContent = action.payload;
    },

    DeletePrayer(state: StateType, action) {
      const index = state.prayers.findIndex((prayer) => prayer.id === action.payload);
      state.prayers.splice(index, 1);
      
    },

    UpdatePrayer: {
      reducer: (state: StateType, action: PayloadAction<any>) => {
        state.prayers = state.prayers.map((prayer) =>
            prayer.id === action.payload.id
            ? { ...prayer, [action.payload.field]: action.payload.value }
            : prayer,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },

    addPrayer: {
      reducer: (state: StateType, action: PayloadAction<any>) => {
        state.prayers.push(action.payload);
      },
      prepare: (id, title, color) => {
        return { payload: { id, title, color, datef: new Date().toDateString(), deleted: false } };
      },
    },
  },
});

export const { SearchPrayers, getPrayers, SelectPrayer, DeletePrayer, UpdatePrayer, addPrayer } =
PrayersSlice.actions;

export const fetchPrayers = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getPrayers(response.data));
  } catch (err: any) {
    //throw new Error(err);
    throw err;
  }
};

export default PrayersSlice.reducer;
