import React, { ReactNode, useEffect } from "react";
import { LogBox, SafeAreaView } from "react-native";
import tw from "../../lib/tailwind";

interface Props {
  children: ReactNode;
  justifyContent?:
    | "justify-start"
    | "justify-end"
    | "justify-center"
    | "justify-between"
    | "justify-around"
    | "justify-evenly";
  alignItems?:
    | ""
    | "items-start"
    | "items-end"
    | "items-center"
    | "items-baseline"
    | "items-stretch";
  extraStyle?: string;
}
const ScreenLayout = ({
  children,
  justifyContent = "justify-center",
  alignItems = "",
  extraStyle = "",
}: Props) => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <SafeAreaView
      style={tw`flex-1 h-full w-full bg-grey-900  ${justifyContent} ${alignItems} ${extraStyle}`}
    >
      {children}
    </SafeAreaView>
  );
};

export default ScreenLayout;
