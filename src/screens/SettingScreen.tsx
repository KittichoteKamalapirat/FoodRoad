import React from "react";
import { Alert, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import { Container } from "../components/containers/Container";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MyText from "../components/MyTexts/MyText";
import { auth } from "../firebase/client";
import tw from "../lib/tailwind";
import { deleteUser, guestLogin, logout } from "../redux/slices/meReducer";
import { RootState } from "../redux/store";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const SettingScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.me);
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
      const result = dispatch(deleteUser(auth.currentUser.uid) as any);
      console.log("result xxx", result);

      if (result) {
        alert("User successfully delete");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log("error deleting the user", error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logout() as any);
      navigation.navigate("Home");
    } catch (error) {
      console.log("error logging out");
    }
  };

  const handleGuestLogin = () => {
    try {
      console.log("handle guest login");
      dispatch(guestLogin() as any);
    } catch (error) {
      console.log("guest login error", error.message);
    }
  };

  console.log("current user", currentUser);
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
            {currentUser.isGuest ? (
              <MyText>I am a guest</MyText>
            ) : (
              <MyText>Phone Number: {currentUser.phoneNumber}</MyText>
            )}

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
          {currentUser.uid ? (
            loggedInBody
          ) : (
            <>
              <Button
                label="Log in with phone number"
                onPress={() =>
                  navigation.navigate("Register", {
                    next: "Home",
                  })
                }
              />

              <Button
                label="Log in as guest"
                onPress={handleGuestLogin}
                type={ButtonTypes.OUTLINED}
              />
            </>
          )}
        </View>
      </Container>
    </ScreenLayout>
  );
};

export default SettingScreen;
