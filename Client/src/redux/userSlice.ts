import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { SetStateAction } from "react";

const initialState = {
  user: JSON.parse(window?.localStorage.getItem("user") as any),
  edit: false,
};
console.log("🚀 ~ initialState.user:", initialState.user)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage?.removeItem("user");
    },
    updateProfile(state, action) {
      state.edit = action.payload;
    },
  },
});
export default userSlice.reducer;

export function UserLogin(user:any) {
  return (dispatch:Dispatch, 
    // getState:SetStateAction<Dispatch>
    ) => {
    dispatch(userSlice.actions.login(user));
  };
}

export function Logout() {
  return (dispatch:Dispatch, 
    // getState:SetStateAction<Dispatch>
    ) => {
    dispatch(userSlice.actions.logout());
  };
}

export function UpdateProfile(val:any) {
  return (dispatch:Dispatch,
    // getState:SetStateAction<Dispatch>
    ) => {
    dispatch(userSlice.actions.updateProfile(val));
  };
}
