import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/client";
import { Shop } from "../../types/Shop";
import { User } from "../../types/User";

const initialState: User[] = [];

// createShop
export const createShop = createAsyncThunk(
  "users/createShop",
  async (shopInput: Shop) => {
    try {
      const { name, description, imgUrl } = shopInput;
      const shop: Shop = {
        name,
        description,
        imgUrl,
      };

      const userDocRef = doc(
        firestore as any,
        "users",
        auth.currentUser?.uid as string
      );

      setDoc(userDocRef, { shop }, { merge: true });

      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return userDocSnap.data(); // return to set redux state
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUsers: (state, action) => {
      return action.payload;
    },
    updateUser: (state, action) => {
      // state = users, no need state.users
      state.map((user) => {
        if (user.uid === action.payload.uid) {
          const newShop: Shop = {
            name: action.payload.name,
            description: action.payload.description,
            imgUrl: action.payload.imgUrl,
          };
          user.shop = newShop;
        }
      });
    },
  },
  // extraReducers: {
  //   [createShop.pending as any]: (state, action) => {
  //     // TODO
  //     console.log("pending state", state);
  //   },
  //   [createShop.fulfilled as any]: (state, action) => {
  //     // TODO
  //     console.log("fulfileed state", state);
  //   },
  //   [createShop.rejected as any]: (state, action) => {
  //     // TODO
  //     console.log("rejected state", state);
  //   },
  // },
});

export const { updateUsers, updateUser } = usersSlice.actions; // action creators are generated for each case in reducer function

export default usersSlice.reducer;
