import { doc, onSnapshot, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import MePin from "../../../assets/svg/me_pin.svg";
import PersonPin from "../../../assets/svg/person_pin.svg";
import ShopPin from "../../../assets/svg/shop_pin.svg";
import { auth, firestore } from "../../firebase/client";
import tw from "../../lib/tailwind";
import { updateSelectedShop } from "../../redux/slices/selectedShopReducer";
import { updateUsers } from "../../redux/slices/usersReducer";
import { RootState } from "../../redux/store";
import { Pin } from "../../types/Pin";
import { Shop } from "../../types/Shop";
import { User } from "../../types/User";
import MyText from "../MyTexts/MyText";

const POLL_INTERVAL = 5000;
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

  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const onRegionChange = (region: Region) => {
    setRegion(region);
  };

  let text = "Waiting..";

  if (errorMsg) {
    text = errorMsg;
  } else if (region) {
    text = JSON.stringify(region);
  }

  const getMyLocation = async () => {
    const location = await getCurrentPositionAsync();

    const { latitude, longitude } = location.coords;
    const myPin = { latitude, longitude };
    return myPin;
  };

  // request permission
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

  // get and set live location
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const myPin = await getMyLocation();
        setPin(myPin);

        // update to firestore
        const userDocRef = doc(
          firestore,
          "users",
          auth.currentUser?.uid as string
        );
        await setDoc(userDocRef, { pin: myPin }, { merge: true });
      } catch (error) {
        console.log("error", error.message);
      }
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [auth.currentUser, region.latitude, region.longitude]);

  // listen to data change in firestore
  useEffect(() => {
    if (auth.currentUser) {
      const colRef = collection(firestore, "users");

      // Create the DB listener
      const unsuscribe = onSnapshot(colRef, (snapshot) => {
        const users = snapshot.docs.map((doc) => {
          // const pinDocRef = doc(doc, "pin", "pin_uid");

          return doc.data();
        });
        dispatch(updateUsers(users));
      });

      return () => {
        unsuscribe();
      };
    }
  }, [dispatch, updateUsers, auth.currentUser]);

  const getPinType = (user: User) => {
    if (user.uid === auth.currentUser?.uid)
      return <MePin width={120} height={40} />;

    if (user.isSeller) return <ShopPin width={120} height={40} />;

    return <PersonPin width={120} height={40} />;
  };

  return (
    <View style={tw`flex-1 bg-grey-0 items-center justify-center`}>
      <MapView
        style={tw`h-full w-full`}
        initialRegion={region}
        onRegionChange={onRegionChange}
        mapType="mutedStandard"
      >
        {/* others markets */}
        {users.map((user, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: user?.pin.latitude,
              longitude: user?.pin.longitude,
            }}
            // title={user.shop.title}
            // description={user.shop.description}
            pinColor={"green"}
            onPress={() => {
              dispatch(updateSelectedShop(user.shop));
            }}
          >
            {getPinType(user)}
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default Map;
