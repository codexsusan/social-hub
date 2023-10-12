import { CommunityUsersState, PartialCommunity } from "@/types/communityTypes";
import { queryParamsType } from "@/types/generalTypes";
import { MemberUser } from "@/types/userTypes";
import { getJoinedMembersByCommunityIdUtils } from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CommunityUsersState = {
  loading: false,
  error: "",
  users: [] as MemberUser[],
};

export const fetchCommunityMembers = createAsyncThunk(
  "fetch/community/users",
  async (attr: {
    data: queryParamsType;
    communityId: PartialCommunity["_id"];
  }) => {
    return getJoinedMembersByCommunityIdUtils(attr.data, attr.communityId).then(
      (res) => res
    );
  }
);

const communityUsersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCommunityMembers.fulfilled,
      (state: CommunityUsersState, action: PayloadAction<ResponseData>) => {
        state.loading = true;
        state.users = action.payload.data.data;
      }
    );
  },
});

export default communityUsersSlice.reducer;
