import Link from "next/link";
import React from "react";
import NavigationBar from "~/components/NavigationBar";

import PageBase from "~/components/PageBase";
import SearchBar from "~/components/SearchBar";

type Props = {
  href: string;
  emoji: string;
  text: string;
} & React.PropsWithChildren;

function EmojiLink({ emoji, text, href }: Props) {
  return (
    <Link
      href={href}
      className="px-auto w-full rounded-lg border-b-4 border-orange-600 bg-orange-500 py-2 text-center text-lg font-bold text-white shadow-lg transition-colors hover:bg-orange-600 "
    >
      <span className="mr-2">{emoji}</span>
      {text}
    </Link>
  );
}

export default function Page() {
  return (
    <PageBase title="Home">
      <NavigationBar />
      <main className="lg:mx-10">
        <div className="home-image-banner flex h-[400px] flex-col items-center justify-center transition-colors lg:rounded-bl-lg lg:rounded-br-lg">
          <SearchBar />
          <div className="mt-4 flex w-3/4 flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 lg:w-1/2">
            <EmojiLink href="/recipes" emoji="🍲" text="Browse Recipes" />
            <EmojiLink
              href="/ingredients"
              emoji="🥦"
              text="Browse Ingredients"
            />
          </div>
        </div>
      </main>
    </PageBase>
  );
}
