import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUsers: (state, action) => {
      console.log("update userssssssssss", state);
      return action.payload;
    },
    updateUser: (state, action) => {
      // state = users, no need state.users
      state.map((user) => {
        if (user.uid === action.payload.uid) {
          user.shop.name = action.payload.name;
          user.shop.description = action.payload.description;
        }
      });
    },
  },
});

export const { updateUsers, updateUser } = usersSlice.actions; // action creators are generated for each case in reducer function

export default usersSlice.reducer;
