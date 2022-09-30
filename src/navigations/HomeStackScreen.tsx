import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationScreenProp } from "react-navigation";
import { bgColor, primaryTextColor } from "../../theme";
import { ButtonTypes } from "../components/Buttons/Button";
import IconButton from "../components/Buttons/IconButton";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SettingScreen from "../screens/SettingScreen";
import {
  default as CreateShopScreen,
  default as LoginScreen,
} from "../screens/shops/CreateShopScreen";
import ShopScreen from "../screens/shops/ShopScreen";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  const navigation: NavigationScreenProp<any, any> = useNavigation();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: primaryTextColor,
        headerTitleAlign: "left", // todo not working
        headerStyle: { backgroundColor: bgColor },
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: "left",
          headerBackVisible: false,
          headerRight: () => (
            <IconButton
              icon={
                <Ionicons
                  name="settings-outline"
                  size={24}
                  color={primaryTextColor}
                />
              }
              type={ButtonTypes.TEXT}
              onPress={() => navigation.navigate("Setting")}
            />
          ),
        }}
      />

      <HomeStack.Screen
        name="Shop"
        component={ShopScreen}
        options={({ route }) => ({
          title: route.params?.name,
        })}
      />

      <HomeStack.Screen
        name="CreateShop"
        component={CreateShopScreen}
        options={({ route }) => ({
          title: route.params?.name,
        })}
      />

      <HomeStack.Screen
        name="Login"
        component={LoginScreen}
        options={() => ({
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.navigate("Setting")}
              icon={
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={primaryTextColor}
                />
              }
              type={ButtonTypes.TEXT}
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="Register"
        component={RegisterScreen}
        options={() => ({
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.navigate("Setting")}
              icon={
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={primaryTextColor}
                />
              }
              type={ButtonTypes.TEXT}
            />
          ),
        })}
      />
      <HomeStack.Screen name="Setting" component={SettingScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
