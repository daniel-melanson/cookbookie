import React from "react";
import SearchBar from "./SearchBar";

export default function HomeMain() {
  return (
    <main className="mx-10">
      <div className="homeImageBanner flex h-64  flex-col items-center justify-center rounded-bl-lg rounded-br-lg">
        <SearchBar />
      </div>
    </main>
  );
}
