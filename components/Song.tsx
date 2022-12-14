import React from "react";
import useSpotify from "../hooks/useSpotify";
import { millisTominutesAndSeconds } from "../lib/time";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";
interface Props {
  track: SpotifyApi.PlaylistTrackObject;
  order: number;
}

export default function Song({ track, order }: Props) {
  const sporitfyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    try {
      setCurrentTrackId(track.track?.id);
      setIsPlaying(true);
      sporitfyApi.play({
        uris: [track.track?.uri || ""],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={playSong}
      className="grid grid-cols-2 text-gray-500
    py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track?.album.images[0].url}
          alt={track.track?.name}
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">
            {track.track?.name}
          </p>
          <p className="w-40 ">{track.track?.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto  md:ml-0 ">
        <p className="w-40 hidden md:inline">{track.track?.album.name}</p>
        <p>{millisTominutesAndSeconds(track.track?.duration_ms ?? 0)}</p>
      </div>
    </div>
  );
}
