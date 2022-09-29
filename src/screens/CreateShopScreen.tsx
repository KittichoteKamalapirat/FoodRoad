import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useDispatch } from "react-redux";
import { grey100 } from "../../theme";
import Button from "../components/Buttons/Button";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MyText from "../components/MyTexts/MyText";
import { auth, firestore } from "../firebase/client";
import tw from "../lib/tailwind";
import { updateUser } from "../redux/slices/usersReducer";

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

interface UserError {
  key?: string | null | undefined;
  message?: string;
}

const defaultValues: FormValues = {
  name: "",
  description: "",
};
const CreateShopScreen = ({ navigation }: Props) => {
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
      console.log("creating a shop");
      const userDocRef = doc(
        firestore,
        "users",
        auth.currentUser?.uid as string
      );

      const { name, description } = data;
      const shop = { name, description };

      setDoc(userDocRef, { shop }, { merge: true });
      dispatch(
        updateUser({
          uid: auth.currentUser?.uid as string,
          name,
          description,
        })
      );
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
                style={tw` text-grey-0 bg-grey-500 w-full h-12 p-2 rounded-sm m-auto my-2`}
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
                  style={tw`text-grey-0 bg-grey-500 w-full h-12 p-2 rounded-sm m-auto my-2`}
                />
              )}
            />
          </View>

          {errors.description && <Text>This is required.</Text>}
        </View>

        <View style={tw`mt-6`}>
          <Button label="สร้างร้าน" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default CreateShopScreen;
