import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./pages/registration-login/UserSlice";
import CatReducer from "./pages/category/CatSlice";
import SystemReducer from "./pages/system-state/SystemSlice";
const Store = configureStore({
  reducer: {
    usersInfo: UserReducer,
    categories: CatReducer,
    systemState: SystemReducer,
  },
});

export default Store;
