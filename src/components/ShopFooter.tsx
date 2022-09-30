import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Container } from "./containers/Container";
import ScreenLayout from "./layouts/ScreenLayout";
import MyText from "./MyTexts/MyText";

const ShopFooter = () => {
  const shop = useSelector((state: RootState) => state.selectedShop);

  if (shop.name === "") return <MyText>Select a shop</MyText>; // blank
  return (
    <ScreenLayout justifyContent="justify-start">
      <Container>
        <View style={{ flex: 1 }}>
          <MyText>Name: {shop?.name}</MyText>
          <MyText>Description: {shop?.description}</MyText>
        </View>
      </Container>
    </ScreenLayout>
  );
};

export default ShopFooter;
