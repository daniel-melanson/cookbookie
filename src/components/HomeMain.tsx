import React from "react";
import SearchBar, { SearchBarStyle } from "./SearchBar";

export default function HomeMain() {
  return (
    <main className="lg:mx-10">
      <div className="homeImageBanner flex h-[400px]  flex-col items-center justify-center rounded-bl-lg rounded-br-lg">
        <SearchBar style={SearchBarStyle.Home} />
      </div>
    </main>
  );
}
