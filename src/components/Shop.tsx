import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Container } from "./containers/Container";
import ScreenLayout from "./layouts/ScreenLayout";
import MyText from "./MyTexts/MyText";

const Shop = () => {
  const route: RouteProp<{ params: { userId: string } }> = useRoute();

  // width = 2
  // height = 1
  // aspect ratio = 2
  const [imgAspectRatio, setImgAspectRatio] = useState(0);
  const userId = route.params.userId;

  const seller = useSelector((state: RootState) => state.users).find(
    (user) => user.uid === userId
  );

  const { name, description, imgUrl } = seller?.shop || {};

  const imgRef = useRef<Image>(null);

  useEffect(() => {
    if (imgUrl)
      Image.getSize(imgUrl, (width, height) => {
        setImgAspectRatio((width / height) * 100);
      });

    // console.log("imgRef", imgRef?.current.naturalWidth);
  }, []);

  return (
    <ScreenLayout justifyContent="justify-start">
      <Container>
        <View style={{ flex: 1 }}>
          <MyText size="text-xl" extraStyle="font-bold mb-2">
            {name}
          </MyText>
          <MyText extraStyle=" my-2">{description}</MyText>

          <Image
            source={{ uri: imgUrl }}
            style={{ width: "100%", paddingBottom: imgAspectRatio }}
          />
        </View>
      </Container>
    </ScreenLayout>
  );
};

export default Shop;
