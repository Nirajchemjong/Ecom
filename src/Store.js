import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./pages/registration-login/UserSlice";
import CatReducer from "./pages/category/CatSlice";
const Store = configureStore({
  reducer: {
    usersInfo: UserReducer,
    categories: CatReducer,
  },
});

export default Store;
