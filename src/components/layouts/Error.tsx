import React from "react";
import { Text, View } from "react-native";
import { defaultTextStyle, defaultViewStyle } from "../../theme/style";

interface Props {
  errorMessage: string;
}
const Error = ({ errorMessage }: Props) => {
  return (
    <View style={defaultViewStyle}>
      <Text style={defaultTextStyle}>{errorMessage}</Text>
    </View>
  );
};

export default Error;
