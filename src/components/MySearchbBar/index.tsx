import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { grey300, primaryTextColor } from "../../../theme";
import tw from "../../lib/tailwind";

interface Props {
  searchText: string;
  onChange: (text: string) => void;
  placeholder: string;
  style: string;
}

const MySearchBar = ({ searchText, onChange, placeholder, style }: Props) => {
  const [text, setText] = useState<string>(searchText || "");

  const handleChange = (newText: string) => {
    setText(newText);
    if (onChange) onChange(newText);
  };

  return (
    <Searchbar
      placeholder={placeholder}
      icon={() => (
        <EvilIcons name="search" size={24} color={primaryTextColor} />
      )}
      clearIcon={() => (
        <MaterialIcons name="clear" size={20} color={primaryTextColor} />
      )}
      onChangeText={(newText) => handleChange(newText)}
      value={text}
      placeholderTextColor={grey300}
      style={tw`bg-bg-color ${style}`} // text-grey-0 doesn't work
      theme={{ colors: { text: primaryTextColor } }}
    />
  );
};

export default MySearchBar;
