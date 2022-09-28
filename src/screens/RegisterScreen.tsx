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
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

interface FormValues {
  [FormNames.USERNAME]: string;
  [FormNames.EMAIL]: string;
  [FormNames.PASSWORD]: string;
  [FormNames.CONFIRM_PASSWORD]: string;
}

interface UserError {
  key?: string | null | undefined;
  message?: string;
}

const defaultValues: FormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const RegisterScreen = ({ navigation }: Props) => {
  console.log("register screen");

  const [passwordIsShown, setPasswordIsShown] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    watch,
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
      console.log("⛔  error registering");
    }
  };

  return (
    <ScreenLayout alignItems="items-center">
      <View style={tw`w-3/4`}>
        <MyText size="text-2xl" weight="font-bold" extraStyle="mb-4">
          Create Account
        </MyText>
        <View style={tw`mt-2`}>
          <MyText>Username</MyText>
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
                placeholder="Username"
                placeholderTextColor={grey100}
                style={tw`text-grey-0 bg-grey-500 w-full h-8 p-2 rounded-sm m-auto my-2`}
              />
            )}
            name={FormNames.USERNAME}
          />

          {errors.username ? <MyText>This is required.</MyText> : null}
        </View>

        <View style={tw`mt-2`}>
          <MyText>Email</MyText>
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
                placeholder="Email"
                placeholderTextColor={grey100}
                style={tw`text-grey-0 bg-grey-500 w-full h-8 p-2 rounded-sm m-auto my-2`}
              />
            )}
            name={FormNames.EMAIL}
          />
          {errors.email ? (
            <Text style={tw`text-grey-0`}>{errors.email?.message}</Text>
          ) : null}
        </View>

        <View style={tw`mt-2`}>
          <Text style={tw`text-white`}>Password</Text>

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
                secureTextEntry={true}
                style={tw`text-grey-0 bg-grey-500 w-full h-8 p-2 rounded-sm m-auto my-2`}
              />
            )}
            name={FormNames.PASSWORD}
          />

          {errors.password && <Text>This is required.</Text>}
        </View>

        <View style={tw`mt-2`}>
          <Text style={tw`text-white`}>Confirm Password</Text>

          <View style={tw`items-end`}>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  value={value}
                  placeholder="Confirm Password"
                  placeholderTextColor={grey100}
                  secureTextEntry={true}
                  style={tw`text-grey-0 bg-grey-500 w-full h-8 p-2 rounded-sm m-auto my-2`}
                />
              )}
              name={FormNames.CONFIRM_PASSWORD}
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

          {errors.confirmPassword && <MyText>Password does not match.</MyText>}
        </View>

        <View style={tw`mt-6`}>
          <Button label="Create account" onPress={handleSubmit(onSubmit)} />
        </View>

        <View style={tw`flex-row justify-center mt-2`}>
          <MyText>Already have an account? </MyText>
          <Button
            label="Log in"
            type={ButtonTypes.TEXT}
            onPress={() => navigation.navigate("Login")}
            size="text-md"
            fontColor="text-primary"
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default RegisterScreen;
