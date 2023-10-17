import { PartialCommunity } from "@/types/communityTypes";
import { queryParamsType } from "@/types/generalTypes";
import { SuperUser, UserPartial } from "@/types/userTypes";
import {
  demoteModeratorToUserUtils,
  getCommunityGuidelinesUtils,
  getJoinedMembersByCommunityIdUtils,
  promoteUserToModeratorUtils,
  updateCommunityGuidelinesUtils,
} from "@/utils/communityUtils";
import { ResponseData } from "@/utils/httpUtils";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ManageState = {
  error: string;
  loading: boolean;
  moderators: {
    loading: boolean;
    error: string;
    users: SuperUser[];
  };
  guidelines: {
    loading: boolean;
    error: string;
    community_guidelines: PartialCommunity["community_guidelines"];
  };
};

const initialState: ManageState = {
  error: "",
  loading: false,
  moderators: {
    loading: false,
    error: "",
    users: [],
  },
  guidelines: {
    loading: false,
    error: "",
    community_guidelines: "",
  },
};

export const fetchCommunityUserForMod = createAsyncThunk(
  "fetch-for-user/moderators",
  async (attr: {
    data: queryParamsType;
    communityId: PartialCommunity["_id"];
  }) => {
    return getJoinedMembersByCommunityIdUtils(attr.data, attr.communityId).then(
      (res) => res
    );
  }
);

export const promoteToModerator = createAsyncThunk(
  "promote-to-moderator",
  async (attr: {
    communityId: PartialCommunity["_id"];
    userId: UserPartial["_id"];
  }) => {
    return promoteUserToModeratorUtils(attr.communityId, attr.userId).then(
      (res) => res
    );
  }
);

export const demoteToUser = createAsyncThunk(
  "demote-to-user",
  async (attr: {
    communityId: PartialCommunity["_id"];
    userId: UserPartial["_id"];
  }) => {
    return demoteModeratorToUserUtils(attr.communityId, attr.userId).then(
      (res) => res
    );
  }
);

export const fetchCommunityGuideLines = createAsyncThunk(
  "fetch-community-guidelines",
  async (communityId: PartialCommunity["_id"]) => {
    return getCommunityGuidelinesUtils(communityId).then((res) => res);
  }
);

export const updateCommunityGuideLines = createAsyncThunk(
  "update-community-guidelines",
  async (attr: {
    community_guidelines: PartialCommunity["community_guidelines"];
    communityId: PartialCommunity["_id"];
  }) => {
    return updateCommunityGuidelinesUtils(
      attr.community_guidelines,
      attr.communityId!
    ).then((res) => res);
  }
);

const manageSlice = createSlice({
  name: "appearance",
  initialState,
  reducers: {
    promoteToModeratorSuccess: (
      state: ManageState,
      action: PayloadAction<SuperUser["_id"]>
    ) => {
      state.moderators.users = state.moderators.users.map((user) => {
        if (user._id === action.payload) {
          user.isModerator = true;
        }
        return user;
      });
    },
    demoteToUserSuccess: (
      state: ManageState,
      action: PayloadAction<SuperUser["_id"]>
    ) => {
      state.moderators.users = state.moderators.users.map((user) => {
        if (user._id === action.payload) {
          user.isModerator = false;
        }
        return user;
      });
    },
    updateCommunityGuidelinesSuccess: (
      state: ManageState,
      action: PayloadAction<PartialCommunity["community_guidelines"]>
    ) => {
      state.guidelines.community_guidelines = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCommunityUserForMod.pending, (state: ManageState) => {
      state.moderators.loading = true;
    });
    builder.addCase(
      fetchCommunityUserForMod.fulfilled,
      (state: ManageState, action: PayloadAction<ResponseData>) => {
        state.moderators.loading = false;
        if (
          state.moderators.users.length > 0 &&
          state.moderators.users[0]._id !== action.payload.data.data[0]._id
        ) {
          state.moderators.users = state.moderators.users.concat(
            action.payload.data.data
          );
        } else {
          state.moderators.users = action.payload.data.data;
        }
      }
    );
    builder.addCase(
      updateCommunityGuideLines.fulfilled,
      (state: ManageState, action: PayloadAction<ResponseData>) => {
        if (action.payload.status === 200) {
          state.guidelines.error = "";
          state.guidelines.loading = false;
        }
      }
    );
    builder.addCase(fetchCommunityGuideLines.pending, (state: ManageState) => {
      state.guidelines.loading = true;
    });
    builder.addCase(
      fetchCommunityGuideLines.fulfilled,
      (state: ManageState, action: PayloadAction<ResponseData>) => {
        state.guidelines.loading = false;
        state.guidelines.community_guidelines =
          action.payload.data.data.community_guidelines;
      }
    );
  },
});

export default manageSlice.reducer;

export const {
  demoteToUserSuccess,
  promoteToModeratorSuccess,
  updateCommunityGuidelinesSuccess,
} = manageSlice.actions;
