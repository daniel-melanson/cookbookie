import React from "react";
import {
  RiFridgeLine,
  RiFridgeFill,
  RiCalendarLine,
  RiCalendarFill,
  RiBookmarkLine,
  RiBookmarkFill,
} from "react-icons/ri";
import IconLink from "./IconLink";
import Link from "next/link";
import SearchBar, { SearchBarStyle } from "./SearchBar";

interface NavigationBarProps {
  includeSearch?: boolean;
}

export default function NavigationBar(props: NavigationBarProps) {
  const session = { user: undefined }; // TODO useSession();

  return (
    <header className="align-center border-light-gray flex h-16 items-center justify-between border-b px-4 py-2">
      <h1 className="text-3xl">
        <Link href="/">CookBookie</Link>
      </h1>
      {props.includeSearch && (
        <SearchBar style={SearchBarStyle.NavigationBar} />
      )}
      <div className="flex items-center justify-end space-x-4 text-3xl">
        {session.user ? (
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
            <div className="bg-blue h-8 w-8 rounded-full" />
            <Link className="rounded p-2 text-lg hover:bg-neutral-200" href="/">
              Sign Out
            </Link>
          </>
        ) : (
          <Link
            className="rounded p-2 text-lg hover:bg-neutral-200"
            href="/login"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
