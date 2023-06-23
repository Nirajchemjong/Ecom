import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./pages/registration-login/UserSlice";
const Store = configureStore({
  reducer: {
    usersInfo: UserReducer,
  },
});

export default Store;
