import { RiSearchLine } from "react-icons/ri";

function SearchInput() {
  return (
    <input
      className="my-2 flex-grow bg-transparent placeholder-neutral-400 focus:outline-none"
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
      className="h-fill flex flex-shrink-0 items-center justify-center rounded-lg"
      type="submit"
    >
      <RiSearchLine className="align-self-middle h-6 w-6 text-3xl text-neutral-300 transition-colors hover:text-orange-500" />
    </button>
  );
}

export default function SearchBar() {
  return (
    <form
      className="align-center flex h-10 w-1/3 items-center space-x-2 rounded-lg border-2 border-neutral-200 bg-white pl-3 pr-2 transition-colors focus-within:border-neutral-300"
      action={"/recipes"}
      method="GET"
    >
      <SearchInput />
      <SearchButton />
    </form>
  );
}
