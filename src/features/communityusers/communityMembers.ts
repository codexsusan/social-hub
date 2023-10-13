import { combineReducers } from "@reduxjs/toolkit";

import moderatorReducer from "./communityModerator";
import userReducer from "./communityUser";

const communityMembers = combineReducers({
    user: userReducer,
    moderators: moderatorReducer
});


export default communityMembers;