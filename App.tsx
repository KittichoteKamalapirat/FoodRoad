import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import TabNavigator from "./src/navigations/TabNavigator";
import store from "./src/redux/store";

const App = () => {
  const [routeName, setRouteName] = useState("");
  const ref = createNavigationContainerRef();
  return (
    <Provider store={store}>
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
    </Provider>
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
