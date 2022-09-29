import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
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

  return (
    <ScreenLayout justifyContent="justify-start">
      <Container>
        <View style={{ flex: 1 }}>
          <MyText>{seller?.shop.name}</MyText>
          <MyText>{seller?.shop.description}</MyText>
        </View>
      </Container>
    </ScreenLayout>
  );
};

export default Shop;
