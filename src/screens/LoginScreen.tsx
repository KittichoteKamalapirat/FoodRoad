import { Entypo } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { grey0, grey100 } from "../../theme";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import IconButton from "../components/Buttons/IconButton";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MyText from "../components/MyTexts/MyText";
import tw from "../lib/tailwind";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

enum FormNames {
  USERNAME_OR_EMAIL_OR_PHONE_NUMBER = "usernameOrEmailOrPhoneNumber",
  PASSWORD = "password",
}

interface FormValues {
  usernameOrEmailOrPhoneNumber: string;
  password: string;
}

interface UserError {
  key?: string | null | undefined;
  message?: string;
}

const defaultValues: FormValues = {
  usernameOrEmailOrPhoneNumber: "",
  password: "",
};
const LoginScreen = ({ navigation }: Props) => {
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const [genericErrorMessage, setGenericErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const route: RouteProp<{ params: { next: string | null } }> = useRoute();

  const togglepasswordIsShown = () => {
    setPasswordIsShown(!passwordIsShown);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
    } catch (error) {
      console.log("⛔ catch block", error);
    }
  };

  return (
    <ScreenLayout alignItems="items-center">
      <View style={tw`w-3/4`}>
        <MyText size="text-2xl" weight="font-bold" extraStyle="mb-4">
          Log in
        </MyText>

        <View style={tw`mt-2`}>
          <Text style={tw`text-white`}>Email or Username</Text>
          <Controller
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
                placeholder="Email or Username"
                placeholderTextColor={grey100}
                style={tw`text-grey-0 bg-grey-500 w-full h-8 p-2 rounded-sm m-auto my-2`}
              />
            )}
            name={FormNames.USERNAME_OR_EMAIL_OR_PHONE_NUMBER}
          />
          {errors.usernameOrEmailOrPhoneNumber ? (
            <Text>This is required.</Text>
          ) : null}
        </View>

        <View style={tw`mt-2`}>
          <Text style={tw`text-white`}>Password</Text>

          <View style={tw`items-end`}>
            <Controller
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
                  placeholder="Password"
                  placeholderTextColor={grey100}
                  secureTextEntry={!passwordIsShown}
                  style={tw`text-grey-0 bg-grey-500 w-full h-8 p-2 rounded-sm m-auto my-2`}
                />
              )}
              name={FormNames.PASSWORD}
            />
            <IconButton
              icon={
                <Entypo
                  name={passwordIsShown ? "eye-with-line" : "eye"}
                  size={16}
                  color={grey0}
                  onPress={togglepasswordIsShown}
                />
              }
            />
          </View>

          {errors.password && <Text>This is required.</Text>}
        </View>

        <View style={tw`mt-6`}>
          <Button label="Login" onPress={handleSubmit(onSubmit)} />
        </View>

        <View style={tw`flex-row justify-center mt-2`}>
          <MyText>Don't have an account yet? </MyText>
          <Button
            label="Create account"
            type={ButtonTypes.TEXT}
            onPress={() => navigation.navigate("Register")}
            size="text-md"
            fontColor="text-primary"
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default LoginScreen;
