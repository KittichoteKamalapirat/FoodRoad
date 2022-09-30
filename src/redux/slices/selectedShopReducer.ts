import { createSlice } from "@reduxjs/toolkit";
import { Shop } from "../../types/Shop";

const initialState: Shop = {
  name: "",
  description: "",
  imgUrl: "",
};

export const selectedShopSlice = createSlice({
  name: "selectedShop",
  initialState,
  reducers: {
    updateSelectedShop: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateSelectedShop } = selectedShopSlice.actions; // action creators are generated for each case in reducer function

export default selectedShopSlice.reducer;
