import { CommunityUsersState, PartialCommunity } from "@/types/communityTypes";
import { queryParamsType } from "@/types/generalTypes";
import { MemberUser } from "@/types/userTypes";
import { getModeratorsByCommunityIdUtils } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CommunityUsersState = {
  loading: false,
  error: "",
  users: [] as MemberUser[],
};

export const fetchCommunityModerators = createAsyncThunk(
  "fetch/community/moderators",
  async (attr: {
    data: queryParamsType;
    communityId: PartialCommunity["_id"];
  }) => {
    return getModeratorsByCommunityIdUtils(attr.data, attr.communityId).then(
      (res) => res
    );
  }
);

export const fetchUpdatedCommunityModerators = createAsyncThunk(
  "fetch/update/moderators",
  async (attr: {
    data: queryParamsType;
    communityId: PartialCommunity["_id"];
  }) => {
    return getModeratorsByCommunityIdUtils(attr.data, attr.communityId).then(
      (res) => res
    );
  }
);

const communityModeratorSlice = createSlice({
  name: "moderators",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCommunityModerators.fulfilled,
      (state: CommunityUsersState, action: PayloadAction<ResponseData>) => {
        state.users = action.payload.data.data;
      }
    );
    builder.addCase(
      fetchCommunityModerators.pending,
      (state: CommunityUsersState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchUpdatedCommunityModerators.fulfilled,
      (state: CommunityUsersState, action: PayloadAction<ResponseData>) => {
        if (state.users.length > 0) {
          state.users = state.users.concat(action.payload.data.data);
        } else {
          state.users = action.payload.data.data;
        }
      }
    );
  },
});

export default communityModeratorSlice.reducer;
