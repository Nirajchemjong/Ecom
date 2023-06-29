import { createSlice } from "@reduxjs/toolkit";
// const [modalShow, setModalShow] = useState(true);
const initialState = {
  modalShow: false,
};
const modalShowSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setmodalShow: (state, { payload }) => {
      state.modalShow = payload;
    },
  },
});

const { reducer, actions } = modalShowSlice;
export const { setmodalShow } = actions;
export default reducer;
