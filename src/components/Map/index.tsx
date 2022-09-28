import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useState } from "react";
import tw from "../../lib/tailwind";
import black_pin from "../../../assets/pins/black_pin.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const initialRegion: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Map = () => {
  const [region, setRegion] = useState<Region>(initialRegion);

  const navigation = useNavigation();

  const shops = useSelector((state: RootState) => state.shops);

  console.log("shops", shops);

  const onRegionChange = (region: Region) => {
    setRegion(region);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={tw`h-full w-full`}
        initialRegion={region}
        onRegionChange={onRegionChange}
        mapType="mutedStandard"
      >
        {shops.map((shop, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: shop.curLat,
              longitude: shop.curLng,
            }}
            title={shop.title}
            description={shop.description}
            onPress={() => {
              console.log("press");
              navigation.navigate(
                "Shop" as never,
                {
                  shopId: shop.id,
                } as never
              );
            }}
            // image={{ uri: "./assets/pins/black_pin" }}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Map;
