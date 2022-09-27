import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import shopsReducer from "./slices/shopsReducer";

// ...
const store = configureStore({
  reducer: {
    shops: shopsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;
