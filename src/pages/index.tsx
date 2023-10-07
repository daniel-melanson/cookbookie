import Head from "next/head";
import Script from "next/script";

import NavigationBar from "~/components/NavigationBar";
import Footer from "~/components/Footer";
import HomeMain from "~/components/HomeMain";

export default function Home() {
  return (
    <>
      <Head>
        <title>CookBookie</title>
      </Head>
      <Script src="https://accounts.google.com/gsi/client" async defer></Script>
      <NavigationBar user={false} includeSearch={true} />
      <HomeMain />
      <Footer />
    </>
  );
}
