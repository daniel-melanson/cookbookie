import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import { api } from "~/utils/api";
import NavigationBar from "~/components/NavigationBar";
import Footer from "~/components/Footer";
import HomeMain from "~/components/HomeMain";

export default function Home() {
  return (
    <>
      <Head>
        <title>CookBookie</title>
      </Head>
      <NavigationBar user={true} includeSearch={true} />
      <HomeMain />
      <Footer />
    </>
  );
}
