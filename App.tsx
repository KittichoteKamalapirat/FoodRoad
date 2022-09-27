import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TabNavigator from "./src/navigations/TabNavigator";

const App = () => {
  const [routeName, setRouteName] = useState("");
  const ref = createNavigationContainerRef();
  return (
    <NavigationContainer
      ref={ref}
      onReady={() => {
        setRouteName((ref as any).getCurrentRoute().name); // TODO
      }}
      onStateChange={async () => {
        const currentRouteName = (ref as any).getCurrentRoute().name;
        setRouteName(currentRouteName);
      }}
    >
      <TabNavigator routeName={routeName} />
      <StatusBar style="auto" />
    </NavigationContainer>
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

export default App;
