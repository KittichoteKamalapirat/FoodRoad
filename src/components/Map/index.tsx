import { doc, onSnapshot, setDoc } from "@firebase/firestore";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import MeWithDirectionPin from "../../../assets/svg/me_with_direction_pin.svg";
import PersonPin from "../../../assets/svg/person_pin.svg";
import ShopPin from "../../../assets/svg/shop_pin.svg";
import {
  CALIFORNIA_LATITUDE,
  CALIFORNIA_LONGITUDE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  POLL_INTERVAL,
} from "../../constants";
import { auth, firestore } from "../../firebase/client";
import tw from "../../lib/tailwind";
import { updateSelectedShop } from "../../redux/slices/selectedShopReducer";
import { updateUsers } from "../../redux/slices/usersReducer";
import { RootState } from "../../redux/store";
import { Pin } from "../../types/Pin";
import { User } from "../../types/User";
import { debounce } from "../../utils/debounce";
import MySearchBar from "../MySearchbBar";

const initialRegion: Region = {
  latitude: CALIFORNIA_LATITUDE,
  longitude: CALIFORNIA_LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const Map = () => {
  const currentUser = useSelector((state: RootState) => state.me);
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  console.log("users", users);
  const [myPin, setMyPin] = useState<Pin>({
    latitude: CALIFORNIA_LATITUDE,
    longitude: CALIFORNIA_LONGITUDE,
  });

  const [filteredSellers, setFilteredSellers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");
  const [region, setRegion] = useState<Region>(initialRegion);

  const filterSellers = debounce((q: string) => {
    const matchedSellers = users
      .filter((user) => user.shop)
      .filter((seller) => {
        const name = seller.shop?.name || "";
        const description = seller.shop?.description || "";
        return (name + description).toLowerCase().includes(q.toLowerCase());
      });
    setFilteredSellers(matchedSellers);
  });

  const handleSearch = (q: string) => {
    if (q !== "") {
      filterSellers(q);
    } else {
      // if not searching => set back to empty array
      debounce(() => setFilteredSellers([]))();
    }
  };

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

    const { latitude, longitude, heading } = location.coords;
    const myPin: Pin = {
      latitude,
      longitude,
      ...(heading && { heading }),
    };
    return myPin;
  };

  const getPinType = (user: User) => {
    if (user.uid === auth.currentUser?.uid)
      return <MeWithDirectionPin width={200} height={100} />;

    if (user.isSeller) return <ShopPin width={120} height={40} />;

    return <PersonPin width={120} height={40} />;
  };

  const renderMarker = (user: User, index: number) => (
    <Marker
      key={index}
      coordinate={{
        latitude: user?.pin.latitude,
        longitude: user?.pin.longitude,
      }}
      // only rotate my current pin
      style={
        user.uid === auth.currentUser?.uid && {
          transform: [
            {
              rotate: `${myPin.heading}deg`,
            },
          ],
        }
      }
      // rotation={130}
      flat={true}
      title={user.shop?.name}
      description={user.shop?.description}
      pinColor={"green"}
      onPress={() => {
        dispatch(updateSelectedShop(user.shop));
      }}
    >
      {getPinType(user)}
    </Marker>
  );
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

  // get and update my live location
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const myNextPin = await getMyLocation();
        setMyPin(myNextPin);

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

  // listen to data changes in firestore
  useEffect(() => {
    const colRef = collection(firestore, "users");

    // Create the DB listener
    const unsuscribe = onSnapshot(colRef, (snapshot) => {
      const users = snapshot.docs.map((doc) => {
        return doc.data();
      });
      dispatch(updateUsers(users));
    });

    return () => {
      unsuscribe();
    };
  }, [dispatch, updateUsers]);

  return (
    <View style={tw`flex-1 bg-grey-0 items-center justify-center`}>
      <MapView
        style={tw`h-full w-full`}
        initialRegion={region}
        onRegionChange={onRegionChange}
        mapType="mutedStandard"
      >
        {filteredSellers.length > 0
          ? filteredSellers.map(renderMarker)
          : users.map(renderMarker)}
      </MapView>
      <MySearchBar
        onChange={(text: string) => handleSearch(text)}
        searchText={searchQuery}
        placeholder="Search for food"
        style="absolute top-2 mx-1"
      />
    </View>
  );
};

export default Map;
