import { createSlice } from "@reduxjs/toolkit";
export interface Shop {
  id: string;
  name: string;
  imgUrl: string;
}

const initialState: Shop[] = [
  {
    id: "1",
    name: "โรตี",
    imgUrl: "www.xxx.com",
  },
  { id: "2", name: "อะโวคาโด", imgUrl: "asdf" },
];

export const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    createShop(state, action) {
      console.log("create shop action");
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        imgUrl: action.payload.imgUrl,
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
