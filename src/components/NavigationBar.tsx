import React from "react";
import { TbFridge, TbBookmark, TbCalendar, TbSearch } from "react-icons/tb";

export default function NavigationBar() {
  return (
    <header className="align-center mb-9 flex h-16 items-center justify-between border-b border-light-gray px-4 py-2">
      <h1 className="text-3xl">CookBookie</h1>
      <form className="align-center flex w-96 items-center space-x-2 rounded-lg bg-white px-4 py-2">
        <TbSearch
          className="align-self-middle
          text-lg"
        />
        <input
          className="bg-transparent focus:outline-none"
          type="search"
          placeholder="Search..."
        />
      </form>
      <div className="flex justify-end space-x-4 text-4xl">
        <TbBookmark />
        <TbCalendar />
        <TbFridge />
        <div className="h-9 w-9 rounded-full bg-blue" />
      </div>
    </header>
  );
}
