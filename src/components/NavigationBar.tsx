import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiCalendarFill,
  RiCalendarLine,
  RiFridgeFill,
  RiFridgeLine,
} from "react-icons/ri";
import IconLink from "~/components/IconLink";

export default function NavigationBar() {
  const { /*data: session ,*/ status } = useSession();

  return (
    <header className="align-center border-light-gray flex h-16 items-center justify-between border-b px-4 py-2">
      <h1 className="font-cursive text-3xl">
        <Link href="/">CookBookie</Link>
      </h1>
      <div className="flex items-center justify-end space-x-4 text-3xl">
        {status === "authenticated" ? (
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
            {/* <div className="bg-blue h-8 w-8 rounded-full" /> */}
            <Link
              className="rounded p-2 text-lg hover:bg-neutral-200"
              href="/"
              onClick={() => void signOut()}
            >
              Sign Out
            </Link>
          </>
        ) : (
          <Link
            className="rounded bg-neutral-950 px-3 py-2 text-lg text-white shadow-lg transition-colors hover:bg-neutral-800"
            href="/login"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
