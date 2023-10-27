import { createSlice } from "@reduxjs/toolkit";

const searchInfoSlice = createSlice({
  name: "searchInfo",
  initialState: {
    searchQuery: "",
  },
  reducers: {
    changeSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export default searchInfoSlice.reducer;

export const { changeSearchQuery } = searchInfoSlice.actions;
