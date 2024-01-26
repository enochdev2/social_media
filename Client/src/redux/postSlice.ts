import { Dispatch, createSlice } from "@reduxjs/toolkit";
// import { SetStateAction } from "react";

const initialState = {
  posts: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export default postSlice.reducer;

export function SetPosts<T>(post: T) {
  return (dispatch: Dispatch, 
    // getState: SetStateAction<Dispatch>
    ) => {
    dispatch(postSlice.actions.getPosts(post));
  };
}
