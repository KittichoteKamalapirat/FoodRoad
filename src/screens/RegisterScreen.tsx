import { RouteProp, useRoute } from "@react-navigation/native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { ApplicationVerifier, PhoneAuthProvider } from "firebase/auth";
import React, { useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { useDispatch } from "react-redux";
import { grey100 } from "../../theme";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MyText from "../components/MyTexts/MyText";
import { app, auth } from "../firebase/client";
import useAuth from "../hooks/useAuth";
import tw from "../lib/tailwind";
import { setMe } from "../redux/slices/meReducer";
import { formatphoneNumber } from "../utils/formatPhoneNumber";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const RegisterScreen = ({ navigation }: Props) => {
  useAuth();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [message, setMessage] = useState({ text: "", color: "green" });

  const route: RouteProp<{ params: { next: string | null } }> = useRoute();

  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);

  const sendSmsVerification = async (
    phoneNumber: string,
    recaptchaVerifier: ApplicationVerifier,
    setVerificationId: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const phoneProvider = new PhoneAuthProvider(auth);
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        formatphoneNumber(phoneNumber, "66"),
        recaptchaVerifier
      );
      setVerificationId(verificationId);
      setMessage({
        text: "Verification code has been sent to your phone.",
        color: "green",
      });
    } catch (error) {
      console.log("error when sending sms verification code");
    }
  };

  const confirmSmsCode = async (verificationId: string, code: string) => {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    try {
      dispatch(setMe(credential) as any);

      setMessage({
        text: "Phone authentication successful 👍",
        color: "green",
      });
    } catch (error) {
      setMessage({
        text: `เลขยืนยันไม่ถูกต้อง`,
        color: "red",
      });
    }
  };

  return (
    <ScreenLayout alignItems="items-center">
      <View style={tw`w-3/4`}>
        <MyText size="text-2xl" weight="font-bold" extraStyle="mb-4">
          Create Account
        </MyText>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={app.options}
          style={tw`bg-grey-0 w-10 h-10`}
        />

        {!verificationId ? (
          <View style={tw`mt-6`}>
            <View style={tw`mt-2`}>
              <MyText>Phone Number</MyText>

              <TextInput
                autoCapitalize="none"
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                placeholder="Phone number"
                placeholderTextColor={grey100}
                style={tw`text-text-primary bg-grey-0 border-1 border-grey-300 w-full h-12 p-2 rounded-md m-auto my-2`}
              />
            </View>

            <Button
              label="Send verification"
              onPress={() => {
                sendSmsVerification(
                  phoneNumber,
                  recaptchaVerifier.current as ApplicationVerifier,
                  setVerificationId
                );
              }}
            />
          </View>
        ) : (
          <View style={tw`mt-6`}>
            <View style={tw`mt-2`}>
              <MyText>Verification code</MyText>

              <TextInput
                onChangeText={setCode}
                autoCapitalize="none"
                value={code}
                placeholder="verification code"
                placeholderTextColor={grey100}
                style={tw`text-text-primary bg-grey-0 border-1 border-grey-300 w-full h-12 p-2 rounded-md m-auto my-2`}
              />
            </View>

            <Button
              label="Verify"
              onPress={() => {
                confirmSmsCode(verificationId, code);
              }}
            />
          </View>
        )}

        {message.text && (
          <MyText fontColor={`text-${message.color}`}>{message.text} </MyText>
        )}

        <View style={tw`flex-row justify-center mt-2`}>
          <MyText>No phone number? </MyText>
          <Button
            label="Log in as a guest"
            type={ButtonTypes.TEXT}
            onPress={() => navigation.navigate("Setting")}
            size="text-md"
            fontColor="text-primary"
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default RegisterScreen;
