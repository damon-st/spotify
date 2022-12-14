import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Player from "../components/Player";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        {/* sidebar */}
        <Sidebar />
        {/* center */}
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};
