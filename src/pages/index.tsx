import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Login from "~/pages/login";
import { Theme } from "@radix-ui/themes";

import { api } from "~/utils/api";
import NavigationBar from "~/components/NavigationBar";
import Footer from "~/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>CookBookie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <main className=""></main>
      <Footer />
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
