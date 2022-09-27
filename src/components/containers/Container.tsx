import { ReactNode } from "react";
import { View } from "react-native";
import tw from "../../lib/tailwind";

interface Props {
  children: ReactNode;
}
export const Container = ({ children }: Props) => (
  <View style={tw`h-full px-1 py-4`}>{children}</View>
);
