import { Text, View } from "react-native";
import React, { Component, useEffect } from "react";
import { auth } from "../firebase/client";
import { useNavigation } from "@react-navigation/native";
import { NavigationScreenProp } from "react-navigation";

export const useAuth = () => {
  const navigation: NavigationScreenProp<any, any> = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) navigation.navigate("Home");
    });

    return unsubscribe;
  }, []);
};

export default useAuth;
