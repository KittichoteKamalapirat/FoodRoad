import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationScreenProp } from "react-navigation";
import { bgColor, grey0 } from "../../theme";
import { ButtonTypes } from "../components/Buttons/Button";
import IconButton from "../components/Buttons/IconButton";
import HomeScreen from "../screens/HomeScreen";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  const navigation: NavigationScreenProp<any, any> = useNavigation();

  return (
    <HomeStack.Navigator
      screenOptions={{
        // headerShown: false,
        headerTintColor: grey0,
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
                <Ionicons name="settings-outline" size={24} color={grey0} />
              }
              type={ButtonTypes.TEXT}
              onPress={() => navigation.navigate("Setting")}
            />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
