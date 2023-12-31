import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ProductList: [],
  SelectedProduct: {},
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductList: (state, { payload }) => {
      state.ProductList = payload;
    },
    setSelectedProduct: (state, { payload }) => {
      state.SelectedProduct = payload;
    },
  },
});

const { reducer, actions } = productSlice;
export const { setProductList, setSelectedProduct } = actions;
export default reducer;
