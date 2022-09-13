import  { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTITY_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTITY_SECRET,
});
export default function useSpotify() {
  let { data: session } = useSession();
  let s = session as any;
  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessToken") {
        signIn();
      }

      spotifyApi.setAccessToken(s?.user?.accessToken);
    }

    return () => {};
  }, [session]);

  return spotifyApi;
}
