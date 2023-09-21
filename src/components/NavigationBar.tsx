import React from "react";
import {
  RiFridgeLine,
  RiFridgeFill,
  RiCalendarLine,
  RiCalendarFill,
  RiBookmarkLine,
  RiBookmarkFill,
  RiSearchLine,
} from "react-icons/ri";
import IconLink from "./IconLink";
import Link from "next/link";

interface NavigationBarProps {
  includeSearch?: boolean;
  // TODO change to a user or session object or something
  user?: boolean;
}

export default function NavigationBar(props: NavigationBarProps) {
  return (
    <header className="align-center mb-9 flex h-16 items-center justify-between border-b border-light-gray px-4 py-2">
      <h1 className="text-3xl">
        <Link href="/">CookBookie</Link>
      </h1>
      {props.includeSearch && (
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
      )}
      <div className="flex items-center justify-end space-x-4 text-3xl">
        {props.user ? (
          <>
            <IconLink
              href="/user/bookmarks"
              line={<RiBookmarkLine />}
              fill={<RiBookmarkFill />}
            />
            <IconLink
              href="/user/calendar"
              line={<RiCalendarLine />}
              fill={<RiCalendarFill />}
            />
            <IconLink
              href="/user/pantry"
              line={<RiFridgeLine />}
              fill={<RiFridgeFill />}
            />
            <div className="h-8 w-8 rounded-full bg-blue" />
          </>
        ) : (
          <Link className="text-lg rounded hover:bg-neutral-200 p-2" href="/signin">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
