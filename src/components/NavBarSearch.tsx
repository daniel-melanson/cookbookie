import React from "react";
import { RiSearchLine } from "react-icons/ri";

export default function NavBarSearch({
  query,
  target,
  onSubmit,
}: {
  query?: string;
  target: "recipes" | "ingredients";
  onSubmit?: (query: string) => void;
}) {
  const [searchQuery, setSearchQuery] = React.useState(query ?? "");

  return (
    <form
      className="flex h-10 w-1/6 min-w-min items-center space-x-2 rounded-lg border-2 border-neutral-200 bg-white pl-3 pr-2 transition-colors focus-within:border-neutral-300"
      action={`/${target}`}
      method="GET"
      onSubmit={(e) => {
        if (onSubmit) {
          e.preventDefault();
          onSubmit(searchQuery);
        }
      }}
    >
      <input
        className="my-2 flex-grow bg-transparent placeholder-neutral-400 focus:outline-none"
        required
        type="search"
        name="q"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        minLength={3}
        maxLength={64}
        placeholder="Search..."
      />
      <button
        className="h-fill flex flex-shrink-0 items-center justify-center rounded-lg"
        type="submit"
      >
        <RiSearchLine className="align-self-middle h-6 w-6 text-3xl text-neutral-300 transition-colors hover:text-orange-500" />
      </button>
    </form>
  );
}
