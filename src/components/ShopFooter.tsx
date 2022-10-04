import React from "react";
import { Image } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";
import tw from "../lib/tailwind";
import { RootState } from "../redux/store";
import { Container } from "./containers/Container";
import ScreenLayout from "./layouts/ScreenLayout";
import MyText from "./MyTexts/MyText";

const ShopFooter = () => {
  const shop = useSelector((state: RootState) => state.selectedShop);

  if (shop.name === "")
    return (
      <Container>
        <MyText>Select a shop</MyText>
      </Container>
    );
  return (
    <ScreenLayout>
      <Container>
        <View style={tw`flex flex-row`}>
          <View style={tw`col-span-1`}>
            <Image
              source={{ uri: shop.imgUrl }}
              // style={{ width: 200, height: 200 }}
              style={tw`col-span-1 w-20 h-20 rounded-xl`}
              resizeMethod="resize"
            />
          </View>

          <View style={tw`m-2`}>
            <MyText>Name: {shop?.name}</MyText>
            <MyText>Description: {shop?.description}</MyText>
          </View>
        </View>
      </Container>
    </ScreenLayout>
  );
};

export default ShopFooter;
