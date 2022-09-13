import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth/core/types";
import { RecoilRoot } from "recoil";

interface Props extends AppProps {
  session: Session | null | undefined;
}

function MyApp({ Component, pageProps, session }: Props) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
