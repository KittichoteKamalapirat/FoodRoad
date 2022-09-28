import { initializeApp } from "firebase/app";
import {
  ApplicationVerifier,
  getAuth,
  GoogleAuthProvider,
  PhoneAuthProvider,
  signInWithCredential,
  signInWithPopup,
  signOut,
  useDeviceLanguage,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { formatphoneNumber } from "../utils/formatPhoneNumber";

const firebaseConfig = {
  apiKey: "AIzaSyBrPMXdAw92A_vzV1VJ37iDDg4oTy1I4RI",
  authDomain: "foodroad-d75fa.firebaseapp.com",
  projectId: "foodroad-d75fa",
  storageBucket: "foodroad-d75fa.appspot.com",
  messagingSenderId: "159547225170",
  appId: "1:159547225170:web:ff340b40419fc744e41b8b",
  measurementId: "G-W8264TE30X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

useDeviceLanguage(auth);

export const firestore = getFirestore(app);
export const functions = getFunctions(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("reslt", result);

    const { email, displayName, photoURL, uid, providerData } = result.user;

    const newUser = {
      uid,
      name: displayName,
      email,
      avatarUrl: photoURL,
      provider: providerData[0].providerId,
    };

    // const docRef = await addDoc(collection(firestore, "users"), newUser);
    const userRef = doc(firestore, "users", uid);

    const docRef = await setDoc(userRef, newUser);
  } catch (error) {
    console.log("error", error);
  }
};

export const logout = () => {
  const response = signOut(auth);
  console.log("response", response);
  console.log("sign out");
};

export const openCustomerPortal = async () => {
  const functionRef = httpsCallable(
    functions,
    "ext-firestore-stripe-payments-createPortalLink"
  );

  const { data } = await functionRef({
    returnUrl: window.location.origin,
  });

  window.location.assign((data as any)?.url); // todo
};

export const fetchSubscription = async (uid: string) => {
  const subsRef = collection(firestore, "users", uid, "subscriptions");
  const subsQuery = query(
    subsRef,
    where("status", "in", ["trialing", "active", "past_due", "unpaid"])
  );

  const subs = await getDocs(subsQuery);

  if (subs.docs.length > 0) return subs.docs[0].data();

  return null;
};

// // phone
// export const sendSmsVerification = async (
//   phoneNumber: string,
//   recaptchaVerifier: ApplicationVerifier,
//   setVerificationId: React.Dispatch<React.SetStateAction<string>>
// ) => {
//   const phoneProvider = new PhoneAuthProvider(auth);
//   try {
//     const verificationId = await phoneProvider.verifyPhoneNumber(
//       formatphoneNumber(phoneNumber, "66"),
//       recaptchaVerifier
//     );
//     setVerificationId(verificationId);

//   } catch (error) {
//     console.log("error when sending sms verification code");
//   }
// };

export const confirmSmsCode = (verificationId: string, code: string) => {
  const credential = PhoneAuthProvider.credential(verificationId, code);
  signInWithCredential(auth, credential).then((result) => {
    // Do something with the results here
    console.log(result);
  });
};
