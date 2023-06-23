import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUsers } = actions;
export default reducer;
