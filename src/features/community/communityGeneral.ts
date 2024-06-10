import { leaveCommunityUtils } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const leaveCommunity = createAsyncThunk(
  "leave/community",
  async (communityId: string) => {
    return leaveCommunityUtils(communityId).then((res) => res);
  }
);

type communityGeneralState = {
  loading: boolean;
  error: string;
  message: string;
};

const communityGeneral = createSlice({
  name: "general",
  initialState: {
    loading: false,
    error: "",
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(leaveCommunity.pending, (state: communityGeneralState) => {
      state.loading = true;
    });
    builder.addCase(
      leaveCommunity.fulfilled,
      (state: communityGeneralState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.message = action.payload.data.message;
      }
    );
    builder.addCase(
      leaveCommunity.rejected,
      (state: communityGeneralState, action) => {
        state.loading = false;
        state.error = action.error.message!;
      }
    );
  },
});

export default communityGeneral.reducer;
