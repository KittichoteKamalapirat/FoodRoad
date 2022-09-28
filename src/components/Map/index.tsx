import { doc, onSnapshot, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { auth, firestore } from "../../firebase/client";
import tw from "../../lib/tailwind";
import { Pin, updateUsers } from "../../redux/slices/usersReducer";
import { RootState } from "../../redux/store";
import MyText from "../MyTexts/MyText";

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const MY_HOUSE_LATITUDE = 13.8732940339;
const MY_HOUSE_LONGITUDE = 13.8732940339;
const CALIFORNIA_LATITUDE = 37.4214938;
const CALIFORNIA_LONGITUDE = -122.083922;
const LATITUDE_DELTA = 0.004757;
const LONGITUDE_DELTA = 0.00686;

const initialRegion: Region = {
  latitude: CALIFORNIA_LATITUDE,
  longitude: CALIFORNIA_LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const Map = () => {
  const navigation = useNavigation();

  const [pin, setPin] = useState<Pin>({
    latitude: CALIFORNIA_LATITUDE,
    longitude: CALIFORNIA_LONGITUDE,
  });

  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [region, setRegion] = useState<Region>(initialRegion);
  const users = useSelector((state: RootState) => state.users);

  console.log("--------------users--------------", users);

  const onRegionChange = (region: Region) => {
    setRegion(region);
  };

  let text = "Waiting..";

  if (errorMsg) {
    text = errorMsg;
  } else if (region) {
    text = JSON.stringify(region);
  }

  useEffect(() => {
    (async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
      } catch (error) {
        console.log("error", error.message);
      }
    })();
  }, [requestForegroundPermissionsAsync]);

  // find  current position
  useEffect(() => {
    (async () => {
      try {
        console.log("find current position");

        const location = await getCurrentPositionAsync();

        const { latitude, longitude } = location.coords;
        console.log("my lat", latitude);
        console.log("my lng", longitude);
        setPin({
          latitude,
          longitude,
        });
      } catch (error) {
        console.log("error", error.message);
      }
    })();
  }, [region.latitude, region.longitude]);

  // update current location for the curent user
  useEffect(() => {
    (async () => {
      try {
        // create current location in user in firebases
        console.log("set current location");
        const userDocRef = doc(
          firestore,
          "users",
          auth.currentUser?.uid as string
        );

        // const pinDocRef = doc(userDocRef, "pin", "pin_uid");
        // const pinColRef = collection(userDocRef, "pin", );

        // await setDoc(pinDocRef, pin);

        await setDoc(userDocRef, pin, { merge: true });
      } catch (error) {
        console.log("error", error.message);
      }
    })();
  }, [auth.currentUser, pin]);

  // get users realtime and put in redux store
  useEffect(() => {
    console.log("+++++++++++++++++update userss+++++++++++++++++");
    if (auth.currentUser) {
      const colRef = collection(firestore, "users");

      // Create the DB listener
      const unsuscribe = onSnapshot(colRef, (snapshot) => {
        const users = snapshot.docs.map((doc) => {
          // const pinDocRef = doc(doc, "pin", "pin_uid");
          // console.log(".........data.........", doc.data());
          return doc.data();
        });
        dispatch(updateUsers(users));
      });

      return () => {
        unsuscribe();
      };
    }
  }, [dispatch, updateUsers, auth.currentUser]);

  return (
    <View style={styles.container}>
      <MapView
        style={tw`h-full w-full`}
        initialRegion={region}
        onRegionChange={onRegionChange}
        mapType="mutedStandard"
      >
        {/* others markets */}
        {users
          .filter((user) => user.uid !== auth.currentUser?.uid)
          .map((user, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: user?.latitude,
                longitude: user?.longitude,
              }}
              // title={user.shop.title}
              // description={user.shop.description}
              pinColor={"green"}
              onPress={() => {
                console.log("press");
                navigation.navigate(
                  "Shop" as never,
                  {
                    shopId: user.uid,
                  } as never
                );
              }}
              // image={{ uri: "./assets/pins/black_pin" }}
            />
          ))}

        {/*  my marker */}
        <Marker
          coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
          title={`lat: ${pin.latitude}`}
          description={`lng: ${pin.longitude}`}
          pinColor={"red"}
          onPress={() => {
            console.log("press");
            navigation.navigate(
              "Shop" as never,
              {
                // shopId: shop.id,
              } as never
            );
          }}
          // image={{ uri: "./assets/pins/black_pin" }}
        />
      </MapView>
      <View style={tw`pt-10`}>
        <MyText>hi</MyText>
        <MyText>hi</MyText>
        <MyText>hi</MyText>
        <MyText>lat: {pin.latitude}</MyText>
        <MyText>lng: {pin.longitude}</MyText>
      </View>
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
