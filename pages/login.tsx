import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import React, { useEffect } from "react";
import { BuiltInProviderType } from "next-auth/providers";

interface Props {
  providers: InferGetServerSidePropsType<typeof getServerSideProps>;
}

const Login = ({ providers }: Props) => {
  return (
    <div
      className="flex flex-col items-center bg-black 
    min-h-screen w-full justify-center"
    >
      <img
        className="w-52 mb-5"
        src="https://links.papareact.com/9xl"
        alt="spotify"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/",
              })
            }
            className="bg-[#18D860] text-white 
          p-5 rounded-full "
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: {
      providers: providers,
    },
  };
};
