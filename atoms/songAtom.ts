import { atom } from "recoil";

export const currentTrackIdState = atom<any>({
  key: "currentTrackIdState",
  default: null,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
