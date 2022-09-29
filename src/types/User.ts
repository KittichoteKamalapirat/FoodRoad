import { Pin } from "./Pin";
import { Shop } from "./Shop";

export interface User {
  uid: string;
  imgUrl: string;
  isSeller: string;
  pin: Pin;
  shop: Shop;
}
