import React from "react";
import { RiSearchLine } from "react-icons/ri";

function SearchInput() {
  return (
    <input
      className="ms-3 flex-grow border-neutral-200 bg-transparent placeholder-neutral-400 focus:outline-none"
      required
      type="search"
      name="q"
      placeholder="Search..."
    />
  );
}

function SearchButton() {
  return (
    <button
      className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-lg border-b-4 border-orange-600 bg-orange-500 transition-colors hover:bg-orange-600 "
      type="submit"
    >
      <RiSearchLine className="align-self-middle text-3xl text-white" />
    </button>
  );
}

export default function SearchBar() {
  return (
    <form
      className="align-center flex w-3/4 items-center space-x-2 rounded-lg bg-white p-1 shadow-xl transition-all  lg:w-1/2"
      action="/recipes"
      method="GET"
    >
      <SearchInput />
      <SearchButton />
    </form>
  );
}
