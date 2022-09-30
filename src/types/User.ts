import { Pin } from "./Pin";
import { Shop } from "./Shop";

export interface User {
  uid: string;
  photoURL?: string;
  phoneNumber: string;
  isSeller: boolean;
  pin: Pin;
  shop?: Shop;
}
