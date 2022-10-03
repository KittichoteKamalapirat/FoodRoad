import {
  PhoneAuthCredential,
  signInAnonymously,
  signInWithCredential,
} from "@firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/client";
import { User } from "../../types/User";

const initialState: User | null = {
  uid: "",
  photoURL: "",
  phoneNumber: "",
  isSeller: false,
  isGuest: false,
  pin: {
    latitude: 0,
    longitude: 0,
  },
  shop: {
    name: "",
    description: "",
    imgUrl: "",
  },
};

// setMe
export const setMe = createAsyncThunk(
  "me",
  async (credential: PhoneAuthCredential) => {
    try {
      const result = await signInWithCredential(auth, credential);

      const { uid, phoneNumber, photoURL } = result.user;
      const newUser: User = {
        uid,
        phoneNumber: phoneNumber || "",
        pin: { latitude: 0, longitude: 0 },
        isSeller: false,
        isGuest: false,
        ...(photoURL && { photoURL }),
      };

      const userRef = doc(firestore, "users", uid);
      // create user in firebase, redux update auth.currentUser automatically
      await setDoc(userRef, newUser);
      return newUser;
    } catch (error) {
      console.log("error login with phone number", error);
    }
  }
);

// guestLogin
export const guestLogin = createAsyncThunk("me/guestLogin", async () => {
  try {
    console.log("1");
    const result = await signInAnonymously(auth);
    console.log("2");

    console.log("result", result);

    const { uid, phoneNumber, photoURL } = result.user;

    const newUser: User = {
      uid,
      phoneNumber: phoneNumber || "",
      pin: { latitude: 0, longitude: 0 },
      isSeller: false,
      isGuest: true,
      ...(photoURL && { photoURL }),
    };
    const userRef = doc(firestore, "users", uid);

    await setDoc(userRef, newUser);
    return newUser;
  } catch (error) {
    console.log("error", error.message);
  }
});

// guestLogin
export const logout = createAsyncThunk("me/logout", async () => {
  try {
    await auth.signOut();
    return initialState;
  } catch (error) {
    console.log("error logging out");
  }
});

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    //   return action.payload;
    // },
  },
  extraReducers: {
    [setMe.pending as any]: (state, action) => {
      // TODO
      console.log("pending state", state);
    },
    [setMe.fulfilled as any]: (state, action) => {
      return action.payload; // return to set state
    },
    [guestLogin.fulfilled as any]: (state, action) => {
      return action.payload; // return to set state
    },
    [logout.fulfilled as any]: (state, action) => {
      return action.payload; // return to set state
    },

    [setMe.rejected as any]: (state, action) => {
      // TODO
      console.log("rejected state", state);
    },
  },
});

export const {} = meSlice.actions; // action creators are generated for each case in reducer function

export default meSlice.reducer;
