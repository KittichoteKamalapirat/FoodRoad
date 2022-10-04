import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Image, Text, TextInput, View } from "react-native";

import { NavigationScreenProp } from "react-navigation";
import { useDispatch } from "react-redux";
import { grey100 } from "../../../theme";
import Button from "../../components/Buttons/Button";
import ScreenLayout from "../../components/layouts/ScreenLayout";
import MyText from "../../components/MyTexts/MyText";
import { auth, storage } from "../../firebase/client";
import tw from "../../lib/tailwind";
import { createShop } from "../../redux/slices/usersReducer";
import { Shop } from "../../types/Shop";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

enum FormNames {
  NAME = "name",
  DESCRIPTION = "description",
}

interface FormValues {
  [FormNames.NAME]: string;
  [FormNames.DESCRIPTION]: string;
}

const defaultValues: FormValues = {
  name: "",
  description: "",
};
const CreateShopScreen = ({ navigation }: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUrl(result.uri);
    }
  };

  const uploadImage = async () => {
    setIsUploading(true);
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    // Create a reference to fileName
    const storageRef = ref(storage, `images/shops/${fileName}`);

    try {
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      setIsUploading(false);
      return downloadUrl;
    } catch (error) {
      console.log("error uploading image", error.message);
      return ""; // TODO do something?
    }
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { name, description } = data;

      const downloadUrl = await uploadImage();
      const shop: Shop = { name, description, imgUrl: downloadUrl };
      dispatch(createShop(shop as any) as any); // TODO

      alert("Store successfully created");
      navigation.navigate("Shop", { userId: auth.currentUser?.uid as string });
    } catch (error) {
      console.log("⛔ catch block", error);
    }
  };

  return (
    <ScreenLayout alignItems="items-center">
      <View style={tw`w-3/4`}>
        <MyText size="text-2xl" weight="font-bold" extraStyle="mb-4">
          สร้างร้าน
        </MyText>

        <View style={tw`mt-2`}>
          <Text style={tw`text-white`}>ชื่อร้าน</Text>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                placeholder="ชื่อร้าน"
                placeholderTextColor={grey100}
                style={tw` text-text-primary bg-grey-500 w-full h-12 p-2 rounded-sm m-auto my-2`}
              />
            )}
          />
          {errors.name ? <Text>This is required.</Text> : null}
        </View>

        <View style={tw`mt-2`}>
          <Text style={tw`text-white`}>รายละเอียด</Text>

          <View style={tw`items-end`}>
            <Controller
              name="description"
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  value={value}
                  placeholder="หมูปิ้ง ไม้ละ 10 บาท"
                  placeholderTextColor={grey100}
                  style={tw`text-text-primary bg-grey-500 w-full h-12 p-2 rounded-sm m-auto my-2`}
                />
              )}
            />
          </View>

          {errors.description && <Text>This is required.</Text>}
        </View>
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <Button
          label={
            imageUrl ? "Change an image" : "Pick an image from camera roll"
          }
          onPress={pickImage}
        />

        {/* {imageUrl && <Button label="Upload" onPress={uploadImage} />} */}

        <View style={tw`mt-6`}>
          <Button label="สร้างร้าน" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default CreateShopScreen;
