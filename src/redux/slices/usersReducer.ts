import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export interface Pin {
//   latitude: number;
//   longitude: number;
// }

// export interface Shop {
//   title: string; // avocado
//   description: string;
// }
export interface User {
  uid: string;
  imgUrl: string;
  isSeller: string;
  // pin: Pin;
  // shop: Shop;
  latitude: number;
  longitude: number;
}

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUsers: (state, action) => {
      return action.payload;
    },
    // createUser(state, action) {
    //   console.log("create shop action");
    //   const { id, title, description, imgUrl, curLat, curLng } = action.payload;
    //   state.push({
    //     id,
    //     title,
    //     description,
    //     imgUrl,
    //     curLat,
    //     curLng,
    //   });
    // },
    // deleteShop(state, action) {
    //   const users = state.filter((shop) => shop.id !== action.payload);
    //   return users;
    // },
  },
});

export const { updateUsers } = usersSlice.actions; // action creators are generated for each case in reducer function

export default usersSlice.reducer;
