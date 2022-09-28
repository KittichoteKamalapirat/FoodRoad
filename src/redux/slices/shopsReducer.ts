import { createSlice } from "@reduxjs/toolkit";
export interface Shop {
  id: string;

  imgUrl: string;
  title: string;
  description: string;
  curLat: number;
  curLng: number;
}

const initialState: Shop[] = [];

export const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    createShop(state, action) {
      console.log("create shop action");
      const { id, title, description, imgUrl, curLat, curLng } = action.payload;
      state.push({
        id,
        title,
        description,
        imgUrl,
        curLat,
        curLng,
      });
    },
    deleteShop(state, action) {
      const shops = state.filter((shop) => shop.id !== action.payload);
      return shops;
    },
  },
});

export const { createShop, deleteShop } = shopsSlice.actions; // action creators are generated for each case in reducer function

export default shopsSlice.reducer;
