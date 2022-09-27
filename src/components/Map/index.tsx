import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useState } from "react";
import tw from "../../lib/tailwind";
import black_pin from "../../../assets/pins/black_pin.png";

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Pin {
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  img: string;
}

const initialRegion: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const initialMarkers: Pin[] = [
  {
    latitude: 37.78825,
    longitude: -122.4324,
    title: "title 1",
    description: "descro",
    img: "../../../assets/pins/black_pin",
  },
  {
    latitude: 37.78825 + 0.1,
    longitude: -122.4324,
    title: "title 2",
    description: "deecrition 2",
    img: black_pin,
  },
  {
    latitude: 37.78825 + 0.01,
    longitude: -122.4324,
    title: "title 2",
    description: "deecrition 2",
    img: "/assets/pins/black_pin.png",
  },
  {
    latitude: 37.78825 + 0.001,
    longitude: -122.4324,
    title: "title 2",
    description: "deecrition 2",
    img: "../../assets/pins/black_pin.png",
  },
];
const Map = () => {
  const [region, setRegion] = useState<Region>(initialRegion);
  const [markers, setMarkers] = useState<Pin[]>(initialMarkers);

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
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
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
