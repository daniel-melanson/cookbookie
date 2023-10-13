import React from "react";
import NavigationBar from "~/components/NavigationBar";

import PageBase from "~/components/PageBase";
import SearchBar, { SearchBarStyle } from "~/components/SearchBar";

export default function Page() {
  return (
    <PageBase title="Home">
      <NavigationBar />
      <main className="lg:mx-10">
        <div className="home-image-banner flex h-[400px] flex-col items-center justify-center rounded-bl-lg rounded-br-lg">
          <SearchBar style={SearchBarStyle.Home} />
        </div>
      </main>
    </PageBase>
  );
}
