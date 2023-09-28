import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Theme } from "@radix-ui/themes";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from '@radix-ui/themes';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
