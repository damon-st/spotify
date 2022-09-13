import React, { useCallback, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useState } from "react";
import useSongInfo from "../hooks/useSongInfo";
import {
  HeartIcon,
  VolumeUpIcon as VolumenDownIcon,
} from "@heroicons/react/outline";
import {
  RewindIcon,
  SwitchHorizontalIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";

export default function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volumen, setVolumen] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentIdTrack(data.body.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((r) => {
          setIsPlaying(r.body.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    try {
      spotifyApi.getMyCurrentPlaybackState().then((r) => {
        console.log(r);

        if (r.body.is_playing) {
          spotifyApi.pause();
          setIsPlaying(false);
        } else {
          spotifyApi.play();
          setIsPlaying(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      //feth the song info
      fetchCurrentSong();
      setVolumen(50);
    }
    return () => {};
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (volumen > 0 && volumen < 100) {
      debounceAdjustVolume(volumen);
    }

    return () => {};
  }, [volumen]);

  const debounceAdjustVolume = useCallback(
    debounce((volumen) => {
      spotifyApi.setVolume(volumen).catch((e) => {
        console.log(e);
      });
    }, 500),
    []
  );

  return (
    songInfo && (
      <div
        className="h-24 bg-gradient-to-b from-black to-gray-900 text-white
     grid grid-cols-3 text-xs md:text-base px-2 md:px-8"
      >
        {/* Left */}
        <div className="flex items-center space-x-4 ">
          <img
            className="hidden md:inline h-10 w-10"
            src={songInfo?.album?.images[0].url}
            alt="image"
          />
          <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists?.[0].name}</p>
          </div>
        </div>
        {/* Center */}
        <div className="flex items-center justify-evenly">
          <SwitchHorizontalIcon className="button" />
          <RewindIcon className="button" />
          {isPlaying ? (
            <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
          ) : (
            <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
          )}
          <FastForwardIcon className="button" />
          <ReplyIcon className="button" />
        </div>
        {/* Rigth */}
        <div
          className="flex items-center space-x-3
         md:space-x-4 justify-end pr-5"
        >
          <VolumenDownIcon
            onClick={() => {
              volumen > 0 && setVolumen(volumen - 10);
            }}
            className="button"
          />
          <input
            onChange={(e) => setVolumen(Number(e.target.value))}
            className="w-14 md:w-20"
            value={volumen}
            type="range"
            min={0}
            max={100}
          />
          <VolumeUpIcon
            onClick={() => {
              volumen < 100 && setVolumen(volumen + 10);
            }}
            className="button"
          />
        </div>
      </div>
    )
  );
}
