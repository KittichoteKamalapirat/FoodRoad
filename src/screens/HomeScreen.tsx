import React from "react";
import { Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useSelector } from "react-redux";
import ScreenLayout from "../components/layouts/ScreenLayout";
import Map from "../components/Map";
import ShopFooter from "../components/ShopFooter";
import { auth } from "../firebase/client";
import tw from "../lib/tailwind";
import { RootState } from "../redux/store";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  const user = auth.currentUser?.phoneNumber;

  const me = useSelector((state: RootState) => state.me);
  console.log("meeeeee", me);

  return (
    <ScreenLayout>
      <View style={tw`h-screen`}>
        <View style={tw`h-4/5`}>
          <Map />
        </View>
        <View style={tw`h-1/5`}>
          <ShopFooter />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;
