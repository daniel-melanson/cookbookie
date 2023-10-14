import Link from "next/link";
import React from "react";

export default function BaseAuthPage(props: React.PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-400 to-red-600">
      <h2 className="mb-10 text-center font-cursive text-5xl font-black text-white">
        <Link href="/">CookBookie</Link>
      </h2>
      <div className="flex h-max w-96 flex-col items-center rounded-md bg-white px-4 py-4 md:px-8 md:py-8">
        {props.children}
      </div>
    </div>
  );
}
