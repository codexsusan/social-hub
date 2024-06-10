import { CommunityUsersState, PartialCommunity } from "@/types/communityTypes";
import { queryParamsType } from "@/types/generalTypes";
import { MemberUser } from "@/types/userTypes";
import {
  getJoinedMembersByCommunityIdUtils
} from "@/utils/communityUtils";
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

export const fetchUpdatedCommunityMembers = createAsyncThunk(
  "fetch/updated/users",
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
      fetchCommunityMembers.pending,
      (state: CommunityUsersState) => {
        state.loading = true;
      }
    );
    
    builder.addCase(
      fetchCommunityMembers.fulfilled,
      (state: CommunityUsersState, action: PayloadAction<ResponseData>) => {
        state.loading = false;
        state.users = action.payload.data.data;
      }
    );
    
    builder.addCase(
      fetchUpdatedCommunityMembers.fulfilled,
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

export default communityUsersSlice.reducer;
