import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/client";
import { updateMe } from "../redux/slices/meReducer";

export const useUpdateMe = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) await dispatch(updateMe(user.uid) as any);
    });

    return unsubscribe;
  }, []);
};

export default useUpdateMe;
