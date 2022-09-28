import React from "react";
import { Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Container } from "../components/containers/Container";
import ScreenLayout from "../components/layouts/ScreenLayout";
import Map from "../components/Map";
import { auth } from "../firebase/client";
import tw from "../lib/tailwind";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  const user = auth.currentUser?.phoneNumber;

  console.log("user", user);
  console.log("home screen, BoxesScreen");

  return (
    <ScreenLayout>
      <View style={tw`h-screen`}>
        <View style={tw`h-3/5`}>
          <Map />
        </View>
        <View style={tw`h-2/5`}>
          <Text>buttom</Text>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;
