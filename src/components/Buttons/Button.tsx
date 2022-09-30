import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "../../lib/tailwind";

export enum ButtonTypes {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  OUTLINED = "outlined",
  TEXT = "text",
}

interface Props {
  onPress?: () => void;
  label: string;
  type?: ButtonTypes;
  fontColor?: string; // TODO => change to color since border also changes, not only font
  size?: string;
}

interface ClassProps {
  type: ButtonTypes;
  fontColor: string;
  size: string;
}

const useButtonStyle = ({ type, fontColor }: ClassProps) => {
  const commonStyle = "rounded-full mt-2";
  switch (type) {
    case ButtonTypes.OUTLINED:
      return `${commonStyle} border-solid border-1 ${
        fontColor ? `border-${fontColor}` : "border-primary"
      }`;

    case ButtonTypes.SECONDARY:
      return `${commonStyle} bg-grey-0 hover:bg-grey-50`;

    case ButtonTypes.TEXT:
      return ``;

    case ButtonTypes.PRIMARY:
    default:
      return `${commonStyle} bg-primary hover:bg-primary-hovered`;
  }
};

const useTextStyle = ({ type, fontColor, size }: ClassProps) => {
  const sizeStyle = (() => {
    switch (size) {
      case "text-sm":
        return "mx-2 my-1";
      default:
        return "mx-4 my-2";
    }
  })();

  const commonStyle = `${sizeStyle} text-center`;

  switch (type) {
    case ButtonTypes.OUTLINED:
      return `${commonStyle} ${
        fontColor ? `text-${fontColor}` : "text-primary"
      }`;

    case ButtonTypes.SECONDARY:
      return `${commonStyle} text-bg-color`;

    case ButtonTypes.TEXT:
      return ` ${fontColor || "text-text-primary"} `;

    case ButtonTypes.PRIMARY:
    default:
      return `${commonStyle}  text-bg-color`;
  }
};

const Button = ({
  label,
  type = ButtonTypes.PRIMARY,
  onPress,
  fontColor = "",
  size = "",
}: Props) => {
  const buttonStyle = useButtonStyle({ type, fontColor, size });
  const textStyle = useTextStyle({ type, fontColor, size });

  return (
    <TouchableOpacity style={tw`${buttonStyle}`} onPress={onPress}>
      <Text style={tw`${textStyle} ${size}`}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
