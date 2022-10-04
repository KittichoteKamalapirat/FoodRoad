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
  disabled?: boolean;
}

interface ClassProps {
  type: ButtonTypes;
  fontColor: string;
  size: string;
  disabled: boolean;
}

const useButtonStyle = ({ type, fontColor, disabled }: ClassProps) => {
  const commonStyle = `rounded-full mt-2  ${disabled && "opacity-50"}`;
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

const useTextStyle = ({ type, fontColor, size, disabled }: ClassProps) => {
  const sizeStyle = (() => {
    switch (size) {
      case "text-sm":
        return "mx-2 my-1";
      default:
        return "mx-4 my-2";
    }
  })();

  const commonStyle = `${sizeStyle} text-center ${disabled && "opacity-30"}`;

  switch (type) {
    case ButtonTypes.OUTLINED:
      return `${commonStyle} ${
        fontColor ? `text-${fontColor}` : "text-primary"
      }`;

    case ButtonTypes.SECONDARY:
      return `${commonStyle} text-bg-color`;

    case ButtonTypes.TEXT:
      return `${disabled && "opacity-30"} ${fontColor || "text-text-primary"} `;

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
  disabled = false,
}: Props) => {
  const buttonStyle = useButtonStyle({ type, fontColor, size, disabled });
  const textStyle = useTextStyle({ type, fontColor, size, disabled });

  return (
    <TouchableOpacity style={tw`${buttonStyle}`} onPress={onPress}>
      <Text style={tw`${textStyle} ${size}`}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
