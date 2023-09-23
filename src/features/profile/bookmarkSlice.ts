import { PostPartial, MultiplePostsInitialState } from "@/types/postTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MultiplePostsInitialState = {
  error: "",
  loading: false,
  posts: [] as PostPartial[],
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default bookmarkSlice.reducer;
