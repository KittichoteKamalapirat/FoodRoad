import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Container } from "./containers/Container";
import ScreenLayout from "./layouts/ScreenLayout";
import MyText from "./MyTexts/MyText";

const Shop = () => {
  const route: RouteProp<{ params: { shopId: string } }> = useRoute();
  const shopId = route.params.shopId;

  const shop = useSelector((state: RootState) => state.shops).find(
    (shop) => shop.id === shopId
  );

  console.log("shop", shop);

  const navigation: NavigationScreenProp<any, any> = useNavigation();

  return (
    <ScreenLayout justifyContent="justify-start">
      <Container>
        <View style={{ flex: 1 }}>
          <MyText>{shop?.title}</MyText>
          <MyText>{shop?.description}</MyText>
        </View>
      </Container>
    </ScreenLayout>
  );
};

export default Shop;
