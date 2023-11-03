import { PartialCommunity } from "@/types/communityTypes";
import { searchCommunityQueryUtils } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface SearchCommunityPage {
  communities: PartialCommunity[];
  loading: boolean;
  error: string;
  totalPages?: number;
}

const initialState: SearchCommunityPage = {
  communities: [],
  loading: false,
  error: "",
  totalPages: 0,
};

export const fetchSearchCommunity = createAsyncThunk(
  "/fetch/search-community",
  async (data: { query: string }) => {
    return searchCommunityQueryUtils(data).then((res) => res);
  }
);

const searchCommunitySlice = createSlice({
  name: "searchCommunity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSearchCommunity.fulfilled,
      (state: SearchCommunityPage, action: PayloadAction<ResponseData>) => {
        state.communities = [...action.payload.data.data];
      }
    );
  },
});

export default searchCommunitySlice.reducer;
