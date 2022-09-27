import { Entypo, EvilIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import { bgColor, grey0, grey300, primaryColor } from "../../theme";
import tw from "../lib/tailwind";
import HomeStackScreen from "./HomeStackScreen";

const Tabs = createBottomTabNavigator();

interface Props {
  routeName: string;
}

const TabNavigator = ({ routeName }: Props) => {
  const hideBottomTab =
    routeName === "Onboarding" ||
    routeName === "Auth" ||
    routeName === "Login" ||
    routeName === "Register"; // hide if onboarding

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: bgColor,
          display: hideBottomTab ? "none" : "flex",
        },
        tabBarActiveTintColor: primaryColor,
      }}
    >
      <Tabs.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={tw`flex items-center justify-center`}>
              <Entypo name="home" size={28} color={focused ? grey0 : grey300} />
              <Text
                style={tw`${focused ? "text-grey-0" : "text-grey-300"} text-sm`}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
