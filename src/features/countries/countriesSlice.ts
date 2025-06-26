import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Country {
  name: string;
  region: string;
  flag: string;
}

interface CountriesState {
  data: Country[];
  filtered: Country[];
  region: string;
  loading: boolean;
  hasInteracted: boolean;
}

const initialState: CountriesState = {
  data: [],
  filtered: [],
  region: 'All',
  loading: false,
  hasInteracted: false, // ✅ track user interaction
};

export const fetchCountries = createAsyncThunk<Country[]>(
  'countries/fetch',
  async () => {
    const res = await fetch('https://restcountries.com/v2/all?fields=name,region,flag');
    return await res.json();
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    filterByRegion(state, action: PayloadAction<string>) {
      state.region = action.payload;
      state.hasInteracted = true;

      if (action.payload === 'All') {
        // ✅ If user has already interacted, clear filtered list
        state.filtered = state.data;
      } else {
        state.filtered = state.data.filter((c) => c.region === action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action: PayloadAction<Country[]>) => {
      state.loading = false;
      state.data = action.payload;
      state.filtered = action.payload; // ✅ On first load, show all
    });
  },
});

export const { filterByRegion } = countriesSlice.actions;
export default countriesSlice.reducer;
