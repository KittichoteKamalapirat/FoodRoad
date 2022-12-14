import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import meReducer from "./slices/meReducer";
import selectedShopReducer from "./slices/selectedShopReducer";
import usersReducer from "./slices/usersReducer";

// ...
const store = configureStore({
  reducer: {
    users: usersReducer,
    selectedShop: selectedShopReducer,
    me: meReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;
