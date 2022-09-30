import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { Alert, Image, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import { Container } from "../components/containers/Container";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MyText from "../components/MyTexts/MyText";
import { auth, firestore } from "../firebase/client";
import tw from "../lib/tailwind";
import usersReducer from "../redux/slices/usersReducer";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const Tab = createBottomTabNavigator();

const SettingScreen = ({ navigation }: Props) => {
  const currentUser = auth.currentUser;
  const createTwoButtonAlert = () =>
    Alert.alert("Are you sure?", "This action cannot be undone", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => handleDeleteUser(),
      },
    ]);

  const handleDeleteUser = async () => {
    try {
      if (!auth.currentUser) return;

      const userRef = doc(firestore, "users", auth.currentUser.uid);
      deleteDoc(userRef).then(() => {
        auth.currentUser?.delete().then(() => {
          navigation.navigate("Home");
          alert("User successfully delete");
        });
      });
    } catch (error) {
      console.log("error deleting the user", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut().then(() => navigation.navigate("Home"));
    } catch (error) {
      console.log("error logging out");
    }
  };

  const loggedInBody = (
    <View>
      <View style={tw`bg-bg-color`}>
        <View style={tw`flex-row items-center m-2`}>
          {/* <Image
            style={tw`w-20 h-20 rounded-full bg-grey-500 mr-2`}
            // source={{ uri: currentUser?.avatar }}
            source={{ uri: "xxx" }}
          /> */}
          <View>
            <MyText>Phone Number: {currentUser?.phoneNumber}</MyText>
            {/* <MyText fontColor="text-grey-300">
              username:{" "}
              <MyText>
                {currentUser?.isGuest
                  ? `Guest-${currentUser.username.slice(0, 6)}`
                  : currentUser?.username}
              </MyText>
            </MyText>

            <MyText fontColor="text-grey-300" extraStyle="mt-2">
              email:{" "}
              <MyText>
                {currentUser?.isGuest ? "No email" : currentUser?.email}
              </MyText>
            </MyText> */}
          </View>
        </View>
      </View>
      <View style={tw`mt-4`}>
        <Button label="Logout" onPress={handleLogout} type={ButtonTypes.TEXT} />
      </View>

      <View style={tw`mt-4`}>
        <Button
          label="Create Shop"
          onPress={() => navigation.navigate("CreateShop")}
          type={ButtonTypes.TEXT}
        />
      </View>

      <View style={tw`mt-4`}>
        <Button
          label="My Shop"
          onPress={() =>
            navigation.navigate("Shop", {
              userId: auth.currentUser?.uid as string,
            })
          }
          type={ButtonTypes.TEXT}
        />
      </View>

      <View style={tw`mt-4`}>
        <Button
          label="Delete Account"
          onPress={createTwoButtonAlert}
          type={ButtonTypes.TEXT}
          fontColor="text-red"
        />
      </View>
    </View>
  );

  return (
    <ScreenLayout justifyContent="justify-start">
      <Container>
        <View>
          {currentUser ? (
            loggedInBody
          ) : (
            <>
              <Button
                label="Login"
                onPress={() =>
                  navigation.navigate("Login", {
                    next: "Home",
                  })
                }
              />

              <Button
                label="Create account"
                onPress={() =>
                  navigation.navigate("Register", {
                    next: "Home",
                  })
                }
              />
            </>
          )}
        </View>
      </Container>
    </ScreenLayout>
  );
};

export default SettingScreen;
