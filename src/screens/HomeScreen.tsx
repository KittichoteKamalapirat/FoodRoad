import React from "react";
import { Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import ScreenLayout from "../components/layouts/ScreenLayout";
import Map from "../components/Map";
import ShopFooter from "../components/ShopFooter";
import { auth } from "../firebase/client";
import tw from "../lib/tailwind";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  const user = auth.currentUser?.phoneNumber;

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
