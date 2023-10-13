import { combineReducers } from "@reduxjs/toolkit";
import manageSlice from "./manageSlice";

const communitySettings = combineReducers({
    manage: manageSlice,
});

export default communitySettings;
