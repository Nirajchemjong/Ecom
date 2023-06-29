import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catList: [],
};
const userSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCatList: (state, { payload }) => {
      state.catList = payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setCatList } = actions;
export default reducer;
