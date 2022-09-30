import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Container } from "./containers/Container";
import ScreenLayout from "./layouts/ScreenLayout";
import MyText from "./MyTexts/MyText";

const Shop = () => {
  const route: RouteProp<{ params: { userId: string } }> = useRoute();
  const userId = route.params.userId;

  const seller = useSelector((state: RootState) => state.users).find(
    (user) => user.uid === userId
  );

  const { name, description, imgUrl } = seller?.shop || {};

  return (
    <ScreenLayout justifyContent="justify-start">
      <Container>
        <View style={{ flex: 1 }}>
          <MyText>{name}</MyText>
          <MyText>{description}</MyText>
          <Image source={{ uri: imgUrl }} style={{ width: 200, height: 200 }} />
        </View>
      </Container>
    </ScreenLayout>
  );
};

export default Shop;
