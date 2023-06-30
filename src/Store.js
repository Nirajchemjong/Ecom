import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./pages/registration-login/UserSlice";
import CatReducer from "./pages/category/CatSlice";
import SystemReducer from "./pages/system-state/SystemSlice";
import ProductReducer from "./pages/products/ProductSlice";
import SelectedProductReducer from "./pages/products/ProductSlice";
const Store = configureStore({
  reducer: {
    usersInfo: UserReducer,
    categories: CatReducer,
    systemState: SystemReducer,
    productState: ProductReducer,
    SelectedProductState: SelectedProductReducer,
  },
});

export default Store;
