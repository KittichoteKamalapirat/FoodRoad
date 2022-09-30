import Constants from "expo-constants";
import React, { useContext, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SearchBar } from "react-native-screens";
import { debounce } from "../utils/debounce";
import { Container } from "./containers/Container";
import MySearchBar from "./MySearchbBar";

import MyText from "./MyTexts/MyText";

const initialData: MusicSearchType = {
  songs: [],
  offset: 0,
  isFetching: false,
  isEmpty: false,
  spotifyToken: "",
  isTokenFetching: false,
};

const ShopSearch = () => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { songs, offset, isFetching, isEmpty } = data;

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    try {
      if (text === "") {
        debounce(() => setData({ ...data, isEmpty: true, songs: [] }))();
      } else {
        debounce(async () => {
          setData({
            ...data,
            isFetching: false,
            songs: newSongs,
            offset: 0, // have to reset so it doesn't go like 700
          });
        })();
      }
    } catch (error) {}

    // await loadNextPage();
  };

  return (
    <Container>
      <MyText size="text-2xl" weight="font-bold" extraStyle="my-2">
        Request a song
      </MyText>

      <MySearchBar
        onChange={(text: string) => handleSearch(text)}
        searchText={searchQuery}
        placeholder="Search for a song"
      />
    </Container>
  );
};

export default ShopSearch;
