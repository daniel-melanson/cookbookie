import React from "react";

import Head from "next/head";
import Script from "next/script";
import Footer from "~/components/Footer";

interface Props {
  title: string;
}

export default function PageBase(props: Props & React.PropsWithChildren) {
  const pageTitle = `${props.title} &ndash; CookBookie`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Script src="https://accounts.google.com/gsi/client" async defer></Script>
      {props.children}
      <Footer />
    </>
  );
}