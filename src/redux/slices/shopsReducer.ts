import { createSlice } from "@reduxjs/toolkit";
export interface Shop {
  id: string;

  imgUrl: string;
  title: string;
  description: string;
  curLat: number;
  curLng: number;
}

const initialState: Shop[] = [
  {
    id: "1",
    title: "โรตี",
    description: "descro",
    imgUrl: "www.xxx.com",
    curLat: 37.78825 + 0.01,
    curLng: -122.4324,
  },
  {
    id: "2",
    title: "อะโวคาโด",
    description: "xx",
    imgUrl: "asdf",
    curLat: 37.78825 + 0.01,
    curLng: -122.4324 + 0.01,
  },
  {
    id: "3",
    title: "soymilk",
    description: "xx",
    imgUrl: "asdf",
    curLat: 37.78825 + 0.03,
    curLng: -122.4324 + 0.03,
  },
  {
    id: "4",
    title: "meat ball",
    description: "xx",
    imgUrl: "asdf",
    curLat: 37.78825 + 0.05,
    curLng: -122.4324 + 0.05,
  },
];

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
