import React from "react";
import { playListState } from "../atoms/playListAtom";
import { useRecoilValue } from "recoil";
import Song from "./Song";
export default function Songs() {
  const playList =
    useRecoilValue<SpotifyApi.SinglePlaylistResponse>(playListState);

  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb-28">
      {playList.tracks.items.map((t, i) => (
        <Song key={t.track?.id} track={t} order={i} />
      ))}
    </div>
  );
}
