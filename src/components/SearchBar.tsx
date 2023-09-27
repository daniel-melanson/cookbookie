import React from "react";
import { RiSearchLine } from "react-icons/ri";

export default function SearchBar() {
  return (
    <form
      className="align-center flex w-96 items-center space-x-2 rounded-lg bg-white px-4 py-2"
      action="/recipes/search"
      method="GET"
    >
      <RiSearchLine
        className="align-self-middle text-lg
          text-neutral-400"
      />
      <input
        className="bg-transparent placeholder-neutral-400 focus:outline-none"
        required
        type="search"
        name="q"
        placeholder="Search..."
      />
    </form>
  );
}
