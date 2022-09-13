import { atom } from "recoil";

export const playListState = atom<any>({
  key: "playListAtomState",
  default: null,
});

export const playListIdState = atom({
  key: "playListIdState",
  default: "4sQSHZqk5mSzWgus3qfKt7",
});
