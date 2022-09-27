import React from "react";
import { View, Text } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Container } from "../components/containers/Container";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MyText from "../components/MyTexts/MyText";

import tw from "../lib/tailwind";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const HomeScreen = ({ navigation }: Props) => {
  console.log("home screen, BoxesScreen");

  return (
    <ScreenLayout>
      <Container>
        <View style={tw`h-full`}>
          <MyText>This is home screen</MyText>
        </View>
      </Container>
    </ScreenLayout>
  );
};

export default HomeScreen;
