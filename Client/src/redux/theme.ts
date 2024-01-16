import { Dispatch, createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: JSON.parse(window?.localStorage.getItem("theme") as any) ?? "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

export default themeSlice.reducer;

export function SetTheme(value:string) {
  return (dispatch:Dispatch) => {
    dispatch(themeSlice.actions.setTheme(value));
  };
}
