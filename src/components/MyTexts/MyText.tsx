import React, { ReactNode } from "react";
import { Text } from "react-native";
import tw from "../../lib/tailwind";

interface Props {
  children: ReactNode;
  fontColor?: string;
  size?: string;
  weight?: string;
  extraStyle?: string;
}

const MyText = ({
  children,
  fontColor = "text-grey-0",
  size = "text-md",
  weight = "",
  extraStyle = "",
}: Props) => {
  return (
    <Text style={tw`${fontColor} ${size} ${weight} ${extraStyle} `}>
      {children}
    </Text>
  );
};

export default MyText;
